const service = {};
service.authentication = require("./Authentication");
service.changeHistory = require("./ChangeHistory");
service.company = require("./Company");
service.department = require("./Department");
service.document = require("./Document");
service.employee = require("./Employee");
service.employeeAnnualTimeOff = require("./EmployeeAnnualTimeOff");
service.notification = require("./Notification");
service.permission = require("./Permission");
service.reportTo = require("./ReportTo");
service.role = require("./Role");
service.socialProfile = require("./SocialProfile");
service.team = require("./Team");
service.timeOff = require("./TimeOff");
service.timeOffHistory = require("./TimeOffHistory");
service.user = require("./AppUser");
service.offboarding = require("./Offboarding");
service.onboarding = require("./Onboarding");
service.video = require("./Video");
service.file = require("./File");
service.task = require("./Task");
service.taskName = require("./TaskName");
service.surveyQuestion = require("./SurveyQuestion");
service.surveyResponse = require("./SurveyResponse");

module.exports = service;
