const controller = require("../../controllers/offboarding/offboarding");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/offboarding").get(controller.showAll);
  router.route("/offboarding/:id").post(controller.showOne);  
  router.route("/offboarding/find/token").post(controller.findByToken);  
  router.route("/offboarding/find/employee").post(controller.findByEmployee);  
  router.route("/offboarding/final/submit").post(controller.submitSurvey);
  router.route("/offboarding").post(controller.createRecord);
  router.route("/offboarding").put(controller.updateRecord);
  router.route("/offboarding/:id").delete(controller.deleteRecord);
};
