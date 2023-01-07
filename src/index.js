require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/taskappdb");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

app.use((err, _, res, next) => {
  if (!err) next();

  res.status(err.status || 500).send({
    status: "error",
    data: { error: err.message || "Error parsing data." },
  });
});
