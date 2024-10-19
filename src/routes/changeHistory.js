const controller = require("../controllers/changeHistory");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/changehistories").get(requireAuth, controller.showAll);
  router.route("/changehistories/:empid").post(requireAuth, controller.showOne);
  router.route("/changehistories").post(requireAuth, controller.createRecord);
  router.route("/changehistories").put(requireAuth, controller.updateRecord);
  router.route("/changehistories/:id").delete(requireAuth, controller.deleteRecord);
};
