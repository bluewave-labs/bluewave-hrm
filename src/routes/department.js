const controller = require("../controllers/department");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/departments").get(controller.showAll);
  router.route("/departments/:id").post(controller.showOne);
  router.route("/departments").post(controller.createRecord);
  router.route("/departments").put(controller.updateRecord);
  router.route("/departments/:id").delete(controller.deleteRecord);
};


