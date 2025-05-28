import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    
    const token = req.cookies?.token;

    if (!token) {
      return res.json({ success: false, message: 'No token, authorization denied' });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded?.id) {
      // Attach user info to request object
      req.user = { id: decoded.id };
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Authorization denied' });
    }
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

export default authUser;
