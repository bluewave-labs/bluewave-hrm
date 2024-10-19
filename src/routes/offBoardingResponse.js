const controller = require("../controllers/offBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingresponse").get(controller.showAllResponse);
  router.route("/offboardingresponse").post(controller.createResponse);
  router.route("/offboardingresponse/:id").get(controller.showOneResponse);
  router.route("/offboardingresponse").put(controller.updateResponse);
  router.route("/offboardingresponse/:id").delete(controller.deleteResponse);
};
