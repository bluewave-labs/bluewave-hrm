const db = require("./models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
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
  res.sendFile(path.join(__dirname, '/constants/index.html'));
  //res.json({ message: "Welcome to headcount backend application" });
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
 * @param {*} param0
 */
const populateDatabaseTables = async ({ all = true }) => {
  let data = require("./constants/data"); // Get the sample data
  console.log("Sync operation in progress, please wait...");
  await db.sequelize.sync({ force: true }); // Perform sync operation
  if (all === true) {
    await data.populateTables(db);
  } else {
    await data.populateRequiredTables(db);
  }
  console.log("Sync operation successful.");
};

/*
Note:
1. The following function call will prepopulate the database table(s) with sample data for testing 
   or required data to initiate the onboarding process. Note that:
   populateDatabaseTables({ all: true }) - prepopulates all database tables with sample data
   populateDatabaseTables({ all: false }) - prepopulates database with required data
2. The "populateDatabaseTables" function must be called at least once to prevent error(s) during 
   certain API calls.   
3. The value of "all" determines the page that comes up when frontend app starts running.
   { all: true } - Frontend app displays login page
   { all: false } - Frontend app displays registration page
4. Comment out the function call after running the application for the first time to prevent
   altering database tables at each run of the application.
*/

populateDatabaseTables({ all: true });
