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
      return res.status(200).json(productExist);
    }
    console.log(req.body);
    const { name, price } = await Product.create(req.body);

    return res.status(200).json({ name, price });
  }
  async show(req, res) {
    const { id } = req.params;

    const productDb = await Product.findByPk(id);

    return res.status(200).json(productDb);
  }
  async update(req, res) {
    const productExist = await Product.findByPk(req.params.id);

    if (productExist) {
      const { name, price } = await productExist.update(req.body);

      return res.json({ name, price });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const productDb = await Product.findByPk(id);

    await productDb.destroy();

    return res.status(200).json({ message: "Sucesso" });
  }
}

export default new ProductController();
