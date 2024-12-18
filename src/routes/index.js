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
// offboarding routes start here
const offboarding = require("./offboarding/offboarding");
const offboardingSurveyQuestion = require("./offboarding/offboardingSurveyQuestion");
const offboardingSurveyResponse = require("./offboarding/offboardingSurveyResponse");
const offboardingDocument = require("./offboarding/offboardingDocument");
const offboardingSignedDocument = require("./offboarding/offboardingSignedDocument");
// offboarding routes end here
// satisfaction survey routes start here
const satisfactionSurvey = require("./satisfactionSurvey/satisfactionSurvey");
// satisfaction survey routes ends here

const notification = require("./notification");
const onBoarding = require("./onBoarding");
const video = require("./video");
const file = require("./file");
const fileName = require("./fileName");
const task = require("./task");
const taskName = require("./taskName.js");
const surveyQuestion = require("./surveyQuestion");
const surveyResponse = require("./surveyResponse");

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
  offboarding(router);
  offboardingSurveyQuestion(router);
  offboardingSurveyResponse(router);
  offboardingDocument(router);
  offboardingSignedDocument(router);
  notification(router);
  onBoarding(router);
  video(router);
  file(router);
  fileName(router);
  task(router);
  taskName(router);
  surveyQuestion(router);
  surveyResponse(router);
  satisfactionSurvey(router);

  return router;
};
