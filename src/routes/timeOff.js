const controller = require("../controllers/timeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffs").get(requireAuth, controller.showAll);
  router.route("/timeoffs/:id").post(requireAuth, controller.showOne);
  router.route("/timeoffs").post(requireAuth, controller.createRecord);
  router.route("/timeoffs").put(requireAuth, controller.updateRecord);
  router.route("/timeoffs/:id").delete(requireAuth, controller.deleteRecord);
};
