import * as Yup from "yup";
import Student from "../models/Student";

class StudentController {
  async store(req, res) {
    const { name } = await Student.create(req.body);

    return res.status(200).json({ name });
  }
}

export default new StudentController();
