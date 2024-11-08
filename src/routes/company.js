const controller = require("../controllers/company");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/company").get(requireAuth, controller.showAll);
  router.route("/company/:id").post(requireAuth, controller.showOne);
  router.route("/company/prop/logo").post(controller.showLogo);
  router.route("/company").post(requireAuth, controller.createRecord);
  router.route("/company").put(requireAuth, controller.updateRecord);
  router.route("/company/:id").delete(requireAuth, controller.deleteRecord);
};
