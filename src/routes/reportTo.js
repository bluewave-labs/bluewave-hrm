const controller = require("../controllers/reportTo");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/reportto").get(controller.showAll);
  router.route("/reportto/:empid").post(controller.showOne);
  router.route("/reportto").post(controller.createRecord);
  router.route("/reportto").put(controller.updateRecord);
  router.route("/reportto/:id").delete(controller.deleteRecord);
};
