const db = require("./models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
app.use(cookieParser());

// app.use(cors());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());
app.use(cookieParser());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Work in progress" });
});

const routes = require("./src/routes/index");
const HTTP_PORT = process.env.HTTP_PORT || 5000;

// Pass the router to the routes defined in the index file
routes(router);
app.use("/api", router);

app.listen(HTTP_PORT, "0.0.0.0", () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}.`);
});
/*
Table(s) that must be prepopulated in production
1. Permission table

*/

//Uncomment the following codes to populate your database

// db.sequelize.sync({ force: true }).then(async () => {
//   let data = require("./constants/data");

//   await data.populateTables(db);

  // await data.populatePermissionTable(db);

//   console.log("Sync operation successful.");
// });

