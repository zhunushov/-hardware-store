const ApiError = require("../error/api.error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "32h" }
  );
};
class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("email and password are required"));
      }
      const user = await User.findOne({ where: { email } });
      if (user) {
        return next(ApiError.badRequest("user already exists"));
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hash,
        role,
      });
      await Basket.create({
        userId: newUser.id,
      }).catch((err) => {
        console.log(err);
      });
      const token = generateJWT(newUser.id, newUser.email, newUser.role);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(`${error}`));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    console.log("emai:", email, "password:", password);
    const user = await User.findOne({ where: { email } });
    console.log("user:", user);
    if (!user) {
      return next(ApiError.badRequest("user not found"));
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return next(ApiError.badRequest("password is incorrect"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}
module.exports = new UserController();
