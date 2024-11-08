const controller = require("../controllers/role");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/roles").get(requireAuth, controller.showAll);
  router.route("/roles/check/:roleTitle").get(requireAuth, controller.checkRecord);
  router.route("/roles/:id").post(requireAuth, controller.showOne);
  router.route("/roles").post(requireAuth, controller.createRecord);
  router.route("/roles/create/bulk").post(requireAuth, controller.createBulkRecord);
  router.route("/roles").put(requireAuth, controller.updateRecord);
  router.route("/roles/:id").delete(requireAuth, controller.deleteRecord);
};
