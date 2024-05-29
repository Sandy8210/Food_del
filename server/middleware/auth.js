import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Not Authorized Login again " });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error Occured" });
  }
};

export default authMiddleWare;
