const controller = require("../controllers/team");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/teams").get(controller.showAll);
  router.route("/teams/:id").post(controller.showOne);
  router.route("/teams").post(controller.createRecord);
  router.route("/teams").put(controller.updateRecord);
  router.route("/teams/:id").delete(controller.deleteRecord);
};
