import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).send({ message: "File not found" });

    const parts = authorization.split(" ");

    if (parts.length !== 2)
      return res.status(401).send({ message: " doesn t have 2 files" });

    const [Schema, token] = parts;

    if (Schema !== "Bearer") return res.status(401).send({ message: "Schema" });

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) return console.log(error.message);

      console.log(decoded);
      const user = await userService.findByIdService(decoded.id);
      if (!user || !user._id)
        return res.status(401).send({ message: "Invalid token!" });

         console.log(user);
      req.userId = user._id;

      return next()
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
