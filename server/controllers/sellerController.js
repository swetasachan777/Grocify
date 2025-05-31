import jwt from 'jsonwebtoken';

export const sellerLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ success: true, message: 'Logged In' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid password or email' });
    }
  } catch (error) {
    console.error('Seller login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};




export const isSellerAuth = async (req, res) => {
  try {
    

   return  res.json({ success: true });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.json({ success: false, message: 'Server error' });
  }
};




export const sellerLogout = (req, res) => {
  try {
    
    res.clearCookie('sellerToken', {
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


