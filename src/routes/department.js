const controller = require("../controllers/department");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/departments").get(controller.showAll);
  router.route("/departments/check/:departmentname").get(controller.checkRecord);
  router.route("/departments/:id").post(controller.showOne);
  router.route("/departments").post(controller.createRecord);
  router.route("/departments/create/bulk").post(controller.createBulkRecord);
  router.route("/departments").put(controller.updateRecord);
  router.route("/departments/:id").delete(controller.deleteRecord);
};


