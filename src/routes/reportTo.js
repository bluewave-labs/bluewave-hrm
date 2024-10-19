const controller = require("../controllers/reportTo");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/reportto").get(requireAuth, controller.showAll);
  router.route("/reportto/:empid").post(requireAuth, controller.showOne);
  router.route("/reportto").post(requireAuth, controller.createRecord);
  router.route("/reportto").put(requireAuth, controller.updateRecord);
  router.route("/reportto/:id").delete(requireAuth, controller.deleteRecord);
};
