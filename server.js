//const authJwt = require("./config/authJwt");
const express = require("express");
const db = require("./models");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Work in progress" });
});

const routes = require("./src/routes/index");
const HTTP_PORT = process.env.HTTP_PORT || 5000;

// Pass the router to the routes defined in the index file
routes(router);
app.use("/api", router);

app.listen(HTTP_PORT, () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}.`);
});

// Uncomment the following codes to populate your database

db.sequelize.sync({ force: true }).then(async () => {
let data = require("./constants/data");
await data.populateTables(db);
console.log("Sync operation successful.");
});

