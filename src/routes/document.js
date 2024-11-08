const controller = require("../controllers/document");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/documents").get(requireAuth, controller.showAll);
  router.route("/documents/:empid").post(requireAuth, controller.showOne);
  router.route("/documents").post(requireAuth, controller.createRecord);
  router.route("/documents/create/bulk").post(requireAuth, controller.createBulkRecord);
  router.route("/documents").put(requireAuth, controller.updateRecord);
  router.route("/documents/:id").delete(requireAuth, controller.deleteRecord);
};
