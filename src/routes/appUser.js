const controller = require("../controllers/appUser");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/appusers").get(controller.showAll);
  router.route("/appusers/:id").post(controller.showOne);
  router.route("/appusers/find/email").post(controller.findByEmail);
  router.route("/appusers").post(controller.createRecord);
  router.route("/appusers").put(controller.updateRecord);
  router.route("/appusers/:id").delete(controller.deleteRecord);
};
