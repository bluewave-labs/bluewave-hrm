const controller = require("../controllers/offBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/offboarding").get(requireAuth, controller.showAll);
  router.route("/offboarding").post(requireAuth, controller.createRecord);
  router.route("/offboarding/:id").post(requireAuth, controller.showOne);
  router.route("/offboarding").put(requireAuth, controller.updateRecord);
  router.route("/offboarding/:id").delete(requireAuth, controller.deleteRecord);
  //Offboarding link generation and submit survey
  router
    .route("/offboarding/:id/submit")
    .post(requireAuth, controller.submitSurvey);
  router
    .route("/offboarding/link/:id")
    .post(requireAuth, controller.generateLink);
  //Offboarding Questions
  router.route("/offboarding/question").get(controller.showAllQuestion);
  router.route("/offboarding/question").post(controller.createQuestion);
  router.route("/offboarding/question/:id").post(controller.showOneQuestion);
};
