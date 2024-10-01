const controller = require("../controllers/company");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/company").get(controller.showAll);
  router.route("/company/:id").post(controller.showOne);
  router.route("/company/prop/logo").post(controller.showLogo);
  router.route("/company").post(controller.createRecord);
  router.route("/company").put(controller.updateRecord);
  router.route("/company/:id").delete(controller.deleteRecord);
};
