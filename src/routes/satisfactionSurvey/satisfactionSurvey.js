const controller = require("../../controllers/satisfactionSurvey/satisfactionSurvey");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/satisfactionsurvey").get(controller.showAll);
  router.route("/satisfactionsurvey/:id").post(controller.showOne);
  router.route("/satisfactionsurvey").post(controller.createRecord);
  router.route("/satisfactionsurvey").put(controller.updateRecord);
  router.route("/satisfactionsurvey/:id").delete(controller.deleteRecord);

  // Route for retrieving survey questions/responses.
  router
    .route("/satisfactionsurvey/questions/start")
    .post(controller.startSurvey);
  router
    .route("/satisfactionsurvey/questions/submit")
    .post(controller.submitSurvey);
  router
    .route("/satisfactionsurvey/questions/send")
    .post(controller.sendSurvey);
router
  .route("/satisfactionsurvey/results/download")
  .post(controller.showResults);
};