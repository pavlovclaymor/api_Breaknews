import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user)
      return res.status(404).send({ message: "user or password not found" });

    const passowrdIsValid = bcrypt.compareSync(password, user.password);

    if (!passowrdIsValid)
      return res.status(404).send({ message: "user or password not found" });

    const token = generateToken(user.id)

    res.send({token: token});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { login };
