const controller = require("../../controllers/offboarding/offboardingSurveyResponse");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingsurveyresponse").get(controller.showAllResponse);
  router.route("/offboardingsurveyresponse").post(controller.createResponse);
  router.route("/offboardingsurveyresponse/:id").post(controller.showOneResponse);
  router.route("/offboardingsurveyresponse").put(controller.updateResponse);
  router.route("/offboardingsurveyresponse/:id").delete(controller.deleteResponse);
};
