const controller = require("../controllers/emergencyContact");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/emergencycontacts").get(controller.showAll);
  router.route("/emergencycontacts/:id").post(controller.showOne);
  router.route("/emergencycontacts").post(controller.createRecord);
  router.route("/emergencycontacts").put(controller.updateRecord);
  router.route("/emergencycontacts/:id").delete(controller.deleteRecord);
};
