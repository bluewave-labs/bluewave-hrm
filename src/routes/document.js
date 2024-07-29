const controller = require("../controllers/document");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/documents").get(controller.showAll);
  router.route("/documents/:empid").post(controller.showOne);
  router.route("/documents").post(controller.createRecord);
  router.route("/documents/create/bulk").post(controller.createBulkRecord);
  router.route("/documents").put(controller.updateRecord);
  router.route("/documents/:id").delete(controller.deleteRecord);
};
