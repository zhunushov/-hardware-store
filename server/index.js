require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const moduls = require("./models/models");
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
