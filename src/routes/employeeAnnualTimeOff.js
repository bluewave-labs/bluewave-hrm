const controller = require("../controllers/employeeAnnualTimeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/employeeannualtimeoffs").get(requireAuth, controller.showAll);
  router.route("/employeeannualtimeoffs/:empid").post(requireAuth, controller.showOne);
  router.route("/employeeannualtimeoffs").post(requireAuth, controller.createRecord);
  router.route("/employeeannualtimeoffs").put(requireAuth, controller.updateRecord);
  router.route("/employeeannualtimeoffs/:id").delete(requireAuth, controller.deleteRecord);
};
