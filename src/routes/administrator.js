const controller = require("../controllers/administrator");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/administrators").get(controller.showAll);
  router.route("/administrators/:id").post(controller.showOne);
  router.route("/administrators").post(controller.createRecord);
  router.route("/administrators").put(controller.updateRecord);
  router.route("/administrators/:id").delete(controller.deleteRecord);
};
