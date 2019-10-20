import Product from "../models/Product";
import * as Yup from "yup";

//INDEX = GET ALL DEVs
//SHOW = GET ONE DEV
//STORE = ADD NEW DEV
//UPDATE
//DELETE
class ProductController {
  async store(req, res) {
    const productExist = await Product.findOne({
      where: { name: req.body.name }
    });

    if (productExist) {
      return res.json(productExist);
    }

    const { name, price } = await Product.create(req.body);

    return res.json({ name, price });
  }
  async show(req, res) {
    const { id } = req.params;

    const productDb = await Product.findById(id);

    return res.status(200).json(productDb);
  }
  async update(req, res) {
    const { name } = req.body;

    const productExist = await Product.findOne({ name });

    if (productExist) {
      return res.json(productExist);
    }

    const { name, price } = await Product.update(req.body);

    return res.json({ name, price });
  }
  async delete(req, res) {
    const { id } = req.params;
    const productDb = await Product.findById(id);

    await Product.delete(productDb);
  }
}

export default new ProductController();
