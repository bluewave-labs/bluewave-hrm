const controller = require("../controllers/offBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingquestion").get(controller.showAllQuestion);
  router.route("/offboardingquestion").post(controller.createQuestion);
  router.route("/offboardingquestion/:id").get(controller.showOneQuestion);
  router.route("/offboardingquestion").put(controller.updateQuestion);
  router.route("/offboardingquestion/:id").delete(controller.deleteQuestion);
};
