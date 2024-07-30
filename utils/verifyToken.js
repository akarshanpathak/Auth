import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({message:"Sign in again "})
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res.status(401).json({message:"Sign in again"})
    }
    req.user = user;
    next();
  });
};

