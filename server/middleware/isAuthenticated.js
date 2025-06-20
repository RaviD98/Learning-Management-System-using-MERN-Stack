import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decode);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    // req.id = decode.id;
    // console.log("User ID from token(isAuthenticated):", req.id);
    console.log("User ID from token(isAuthenticated):", req.id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error (Auth)",
      success: false,
      error: error.message, // This will help in debugging
    });
  }
};

export default isAuthenticated;
