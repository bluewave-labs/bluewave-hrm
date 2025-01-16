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

/**
 * This function prepopulates database table(s) with sample data.
 * It must be called at least once to prevent error during certain API calls.
 * @param {*} param0
 */
const populateDatabaseTables = async ({ all = true }) => {
  let data = require("./constants/data"); // Get the sample data
  console.log("Sync operation in progress, please wait...");
  await db.sequelize.sync({ force: true }); // Perform sync operation
  if (all === true) {
    await data.populateTables(db);
  } else {
    await data.populatePermissionTable(db);
  }
  console.log("Sync operation successful.");
};

/*
Note:
1. Comment out the following function call after running the application for the first time to prevent
   altering database tables at each run of the application.
2. Change value of "all" to false to prepopulate permission table only.
*/
populateDatabaseTables({ all: true });

