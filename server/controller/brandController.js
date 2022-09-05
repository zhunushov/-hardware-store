{
  const { Brand } = require("../models/models");
  class BrandController {
    async create(req, res) {
      try {
        console.log("REQ BODY", req.body);
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
      } catch (error) {
        console.log(error);
      }
    }
    async getAll(req, res) {
      const brand = await Brand.findAll();
      return res.json(brand);
    }
    async getOne(req, res) {
      const { id } = req.params;
      const brand = await Brand.findByPk(id);
      return res.json(brand);
    }
    async delete(req, res) {
      try {
        const { id } = req.params;
        const brand = await Brand.destroy({
          where: { id },
        });
        return res.json(`id: ${id} brand deleted`);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    async update(req, res) {
      const { id } = req.params;
      const { name } = req.body;
      const brand = await Brand.update(
        { name },
        {
          where: { id },
        }
      );
      return res.json(`id: ${id} brand updated`);
    }
  }
  module.exports = new BrandController();
}
