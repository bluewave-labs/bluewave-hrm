const controller = require("../../controllers/offboarding/offboardingSignedDocument");
const { requireAuth } = require("../../../config/authJwt");

module.exports = (router) => {
  router.route("/offboardingsigneddoc").get(controller.showAllDoc);
  router.route("/offboardingsigneddoc").post(controller.createDoc);
  router.route("/offboardingsigneddoc/create/bulk").post(controller.createManyDoc);
  router.route("/offboardingsigneddoc/:id").post(controller.showOneDoc);
  router.route("/offboardingsigneddoc").put(controller.updateDoc);
  router.route("/offboardingsigneddoc/update/bulk").put(controller.updateManyDoc);
  router.route("/offboardingsigneddoc/:id").delete(controller.deleteDoc);
  router.route("/offboardingsigneddoc/delete/bulk").delete(controller.deleteManyDoc);
};
