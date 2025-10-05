import JWT from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized Access. Login Again",
    });
  }
  try {
    const tokenDecode = JWT.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode) {
      return res.json({
        success: false,
        message: "Unauthorized Access. Login Again",
      });
    }

    if (!req.body) req.body = {};
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
