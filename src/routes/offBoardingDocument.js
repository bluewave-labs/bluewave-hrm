const controller = require("../controllers/offBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingdoc").get(controller.showAllDoc);
  router.route("/offboardingdoc").post(controller.createdoc);
  router.route("/offboardingdoc/:id").get(controller.showOnedoc);
  router.route("/offboardingdoc").put(controller.updateDoc);
  router.route("/offboardingdoc/:id").delete(controller.deleteDoc);
};
