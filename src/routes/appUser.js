const controller = require("../controllers/appUser");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/appusers").get(requireAuth, controller.showAll);
  router.route("/appusers/refresh").get(requireAuth, controller.refresh);
  router.route("/appusers/:id").post(requireAuth, controller.showOne);
  router.route("/appusers/find/email").post(requireAuth, controller.findByEmail);
  router.route("/appusers/find/token").post(requireAuth, controller.findByToken);
  router.route("/appusers/find/init/check").post(controller.init);
  router.route("/appusers").post(requireAuth, controller.createRecord);
  router.route("/appusers").put(requireAuth, controller.updateRecord);
  router.route("/appusers/update/bulk").put(requireAuth, controller.updateBulkRecord);
  router.route("/appusers/:id").delete(requireAuth, controller.deleteRecord);
};
