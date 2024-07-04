const controller = require("../controllers/permission");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/permissions").get(controller.showAll);
  router.route("/permissions/:id").post(controller.showOne);
  router.route("/permissions").post(controller.createRecord);
  router.route("/permissions").put(controller.updateRecord);
  router.route("/permissions/:id").delete(controller.deleteRecord);
};
