import * as Yup from "yup";
import Question from "../models/Question";
//INDEX = GET ALL DEVs
//SHOW = GET ONE DEV
//STORE = ADD NEW DEV
//UPDATE
//DELETE

class QuestionController {
  async index(req, res) {
    const questions = await Question.findAll({
      where: { product_id: req.params.product_id }
    });

    return res.status(200).json(questions);
  }
  async show(req, res) {
    const { id } = req.params;

    const questionDb = await Question.findById(id);

    return res.status(200).json(questionDb);
  }
  async store(req, res) {
    const { productId } = req.params;

    const { question, answer } = await Question.create({
      product: productId,
      question: req.body.question,
      answer: req.body.answer
    });

    return res.status(200).json({ question, answer });
  }
  async update(req, res) {
    const { productId } = req.params;
    const { question, answer } = req.body;

    await Question.update({
      product_id: productId,
      question: question,
      answer: answer
    });

    return res.status(200).json({ message: "Sucesso" });
  }
}

export default new QuestionController();
