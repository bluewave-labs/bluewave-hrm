const controller = require("../../controllers/offboarding/offboardingSurveyQuestion");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingsurveyquestion").get(controller.showAllQuestion);
  router.route("/offboardingsurveyquestion").post(controller.createQuestion);
  router.route("/offboardingsurveyquestion/create/bulk").post(controller.createManyQuestion);
  router.route("/offboardingsurveyquestion/:id").post(controller.showOneQuestion);
  router.route("/offboardingsurveyquestion").put(controller.updateQuestion);
  router.route("/offboardingsurveyquestion/update/bulk").put(controller.updateManyQuestion);
  router.route("/offboardingsurveyquestion/:id").delete(controller.deleteQuestion);
  router.route("/offboardingsurveyquestion/delete/bulk").delete(controller.deleteManyQuestion);
};
