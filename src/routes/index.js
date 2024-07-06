const authentication = require("./authentication");
const changeHistory = require("./changeHistory");
const company = require("./company");
const department = require("./department");
const document = require("./document");
const employee = require("./employee");
const employeeAnnualTimeOff = require("./employeeAnnualTimeOff");
const permission = require("./permission");
const reportTo = require("./reportTo");
const role = require("./role");
const socialProfile = require("./socialProfile");
const team = require("./team");
const timeOff = require("./timeOff");
const timeOffHistory = require("./timeOffHistory");
const appUser = require("./appUser");
const update = require("./update");

module.exports = (router) => {
  authentication(router);
  changeHistory(router);
  company(router);
  department(router);
  document(router);
  employee(router);
  employeeAnnualTimeOff(router);
  permission(router);
  reportTo(router);
  role(router);
  socialProfile(router);
  team(router);
  timeOff(router);
  timeOffHistory(router);
  appUser(router);
  update(router);

  return router;
};