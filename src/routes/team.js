const controller = require("../controllers/team");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/teams").get(requireAuth, controller.showAll);
  router.route("/teams/:id").post(requireAuth, controller.showOne);
  router.route("/teams").post(requireAuth, controller.createRecord);
  router.route("/teams").put(requireAuth, controller.updateRecord);
  router.route("/teams/:id").delete(requireAuth, controller.deleteRecord);
};
