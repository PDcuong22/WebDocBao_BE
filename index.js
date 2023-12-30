const express = require("express");
const db = require("./configs/db");
const categoryRouter = require("./routers/categoryRouter");
const subCategoryRouter = require("./routers/subCategoryRouter");
const authorRouter = require("./routers/authorRouter");
const articleRouter = require("./routers/articleRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

db.connectDB();

const app = express();
const POST = process.env.POST || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use(cors());

app.use("/api/category", categoryRouter);
app.use("/api/subCategory", subCategoryRouter);
app.use("/api/author", authorRouter);
app.use("/api/auth", require("./routers/auth"));
app.use("/api/user", require("./routers/userRouter"));
app.use("/api/article", articleRouter);

app.listen(POST, () => {
  console.log(`Example app listening on POST ${POST}`);
});
