const controller = require("../controllers/permission");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/permissions").get(requireAuth, controller.showAll);
  router.route("/permissions/:id").post(requireAuth, controller.showOne);
  router.route("/permissions").post(requireAuth,controller.createRecord);
  router.route("/permissions").put(requireAuth, controller.updateRecord);
  router.route("/permissions/:id").delete(requireAuth, controller.deleteRecord);
};
