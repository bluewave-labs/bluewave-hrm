const controller = require("../controllers/role");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/roles").get(controller.showAll);
  router.route("/roles/:id").post(controller.showOne);
  router.route("/roles").post(controller.createRecord);
  router.route("/roles").put(controller.updateRecord);
  router.route("/roles/:id").delete(controller.deleteRecord);
};
