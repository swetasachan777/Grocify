import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register request:', { name, email, password: password ? '***' : null });

    if (!name || !email || !password) {
      console.warn('Missing details');
      return res.status(400).json({ success: false, message: 'Missing details' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn('User already exists:', email);
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    console.log('User created:', user._id);

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ success: true, user: { email: user.email, name: user.name } });

  } catch (error) {
    console.error('Register user error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.json({ success: false, message: 'Missing email or password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user: { email: user.email, name: user.name } });

  } catch (error) {
    console.error('Login user error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const isAuth = async (req, res) => {
  try {
    const userId = req.user?.id;  // get userId from middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const logout = (req, res) => {
  try {
    
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      
    });

    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.json({ success: false, message: 'Server error during logout' });
  }
};

