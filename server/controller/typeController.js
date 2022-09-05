const { Type } = require("../models/models");
class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const type = await Type.findByPk(id);
    return res.json(type);
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const type = await Type.destroy({
        where: { id },
      });
      return res.json(`id: ${id} type deleted`);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const type = await Type.update(
      { name },
      {
        where: { id },
      }
    );
    return res.json(`id: ${id} type updated`);
  }
}
module.exports = new TypeController();
