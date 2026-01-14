import jwt from "jsonwebtoken";
export const protect = (req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({msg:"No token"});
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};
export const adminOnly=(req,res,next)=>{
  if(req.user.role!=="admin") return res.status(403).json({msg:"Admin only"});
  next();
};