const controller = require("../controllers/timeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffs").get(controller.showAll);
  router.route("/timeoffs/:id").post(controller.showOne);
  router.route("/timeoffs").post(controller.createRecord);
  router.route("/timeoffs").put(controller.updateRecord);
  router.route("/timeoffs/:id").delete(controller.deleteRecord);
};
