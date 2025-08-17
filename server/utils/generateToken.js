import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
      user: {
        ...user._doc,
        password: undefined, 
      },
    });
};
