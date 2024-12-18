const controller = require("../../controllers/offboarding/offboardingDocument");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingdoc").get(controller.showAllDoc);
  router.route("/offboardingdoc").post(controller.createDoc);
  router.route("/offboardingdoc/create/bulk").post(controller.createManyDoc);
  router.route("/offboardingdoc/:id").post(controller.showOneDoc);
  router.route("/offboardingdoc").put(controller.updateDoc);
  router.route("/offboardingdoc/update/bulk").put(controller.updateManyDoc);
  router.route("/offboardingdoc/:id").delete(controller.deleteDoc);
  router.route("/offboardingdoc/delete/bulk").delete(controller.deleteManyDoc);
};
