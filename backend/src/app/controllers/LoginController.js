import jwt from "jsonwebtoken";
import * as Yup from "yup";
import Teacher from "../models/Teacher";
import auth from "../../config/auth";

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ where: { email } });

    if (!teacher) {
      res.status(401).json({ error: "Teacher not found" });
    }

    if (!(await teacher.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, name, email } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  }
}

export default new LoginController();
