const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/api.error");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      const data = {
        name,
        price: parseInt(price),
        brandId: parseInt(brandId),
        typeId: parseInt(typeId),
        img: fileName,
      };
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create(data);

      if (info) {
        JSON.parse(info).forEach((item) => {
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: device.id,
          });
        });
      }
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(`ERROR CREATE DEVICE: ${error}`));
    }
  }
  async getAll(req, res, next) {
    try {
      const { brandId, typeId, limit = 100, page = 1 } = req.query;
      const offset = (page - 1) * limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: {
            brandId,
          },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: {
            typeId,
          },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: {
            brandId,
            typeId,
          },
          limit,
          offset,
        });
      }
      return res.json(devices);
    } catch (error) {
      next(ApiError.badRequest(`ERROR GET ALL: ${error}`));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(`ERROR OF GET ONE: ${error}`));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const fileName = await Device.findOne({
        where: { id },
        attributes: ["img"],
      });
      fs.unlinkSync(path.resolve(__dirname, "..", "static", fileName.img));
      await Device.destroy({
        where: { id },
      });
      return res.json(`id: ${id} device deleted`);
    } catch (error) {
      next(ApiError.badRequest(`ERROR OF DELETE: ${error}`));
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      const data = {
        name,
        price: parseInt(price),
        brandId: parseInt(brandId),
        typeId: parseInt(typeId),
        img: fileName,
      };
      const fileDelete = await Device.findOne({
        where: { id },
        attributes: ["img"],
      });
      fs.unlinkSync(path.resolve(__dirname, "..", "static", fileDelete.img));
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      await Device.update(data, {
        where: { id },
      });
      if (info) {
        JSON.parse(info).forEach((item) => {
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: id,
          });
        });
      }
      return res.json(`id: ${id} device updated`);
    } catch (error) {
      next(ApiError.badRequest(`ERROR OF UPDATE: ${error}`));
    }
  }
}
module.exports = new DeviceController();
