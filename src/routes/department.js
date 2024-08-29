const controller = require("../controllers/department");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/departments").get(requireAuth, controller.showAll);
  router.route("/departments/check/:departmentname").get(requireAuth, controller.checkRecord);
  router.route("/departments/:id").post(requireAuth, controller.showOne);
  router.route("/departments").post(requireAuth, controller.createRecord);
  router.route("/departments/create/bulk").post(requireAuth, controller.createBulkRecord);
  router.route("/departments").put(requireAuth, controller.updateRecord);
  router.route("/departments/:id").delete(requireAuth, controller.deleteRecord);
};


