const controller = require("../controllers/changeHistory");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/changehistories").get(controller.showAll);
  router.route("/changehistories/:empid").post(controller.showOne);
  router.route("/changehistories").post(controller.createRecord);
  router.route("/changehistories").put(controller.updateRecord);
  router.route("/changehistories/:id").delete(controller.deleteRecord);
};
