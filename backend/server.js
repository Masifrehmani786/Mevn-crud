const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const TodoListRoutes = require("./routes/api/Todolisth");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    )
  )
  .catch((err) => console.log(`Mongodb Database Error ${err}`.bgRed.white));

app.use("/api/todoList", TodoListRoutes);

app.listen(process.env.PORT, () =>
  console.log(
    `App listening at http://localhost:${process.env.PORT}`.bgGreen.white
  )
);
