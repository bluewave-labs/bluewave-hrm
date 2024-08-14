const controller = require("../controllers/employeeAnnualTimeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/employeeannualtimeoffs").get(controller.showAll);
  router.route("/employeeannualtimeoffs/:empid").post(controller.showOne);
  router.route("/employeeannualtimeoffs").post(controller.createRecord);
  router.route("/employeeannualtimeoffs").put(controller.updateRecord);
  router.route("/employeeannualtimeoffs/:id").delete(controller.deleteRecord);
  router.route("/timeOffPolicies/:empId").post(controller.timeOffPolicies);
};
