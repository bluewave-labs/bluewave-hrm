const controller = require("../controllers/employee");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/employees").get(controller.showAll);
  router.route("/employees/:id").post(controller.showOne);
  router.route("/employees").post(controller.createRecord);
  router.route("/employees").put(controller.updateRecord);
  router.route("/employees/:id").delete(controller.deleteRecord);
};
