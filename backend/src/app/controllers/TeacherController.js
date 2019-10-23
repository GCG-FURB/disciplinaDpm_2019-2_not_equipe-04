import Teacher from "../models/Teacher";
import * as Yup from "yup";
//INDEX = GET ALL DEVs
//SHOW = GET ONE DEV
//STORE = ADD NEW DEV
//UPDATE
//DELETE
class TeacherController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const teacherExists = await Teacher.findOne({
      where: { email: req.body.email }
    });

    if (teacherExists) {
      return res.json(teacherExists);
    }

    const { name, email } = await Teacher.create(req.body);

    return res.status(200).json({ name, email });
  }
  async show(req, res) {
    const { id } = req.params;
    console.log(id);
    const teacherDB = await Teacher.findByPk(id);

    return res.status(200).json(teacherDB);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const teacherExists = await Teacher.findOne({
      where: { email: req.body.email }
    });

    const { name, email } = await teacherExists.update(req.body);
    if (teacherExists) {
      return res.status(200).json({ name, email });
    } else {
      return res.status(400).json({ error: "Teacher dont exists" });
    }
  }
}

export default new TeacherController();
