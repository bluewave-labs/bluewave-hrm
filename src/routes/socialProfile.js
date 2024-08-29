const controller = require("../controllers/socialProfile");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/socialprofiles").get(requireAuth, controller.showAll);
  router.route("/socialprofiles/:empid").post(requireAuth,controller.showOne);
  router.route("/socialprofiles/find/url").post(requireAuth, controller.findOne);
  router.route("/socialprofiles").post(requireAuth, controller.createRecord);
  router.route("/socialprofiles").put(requireAuth, controller.updateRecord);
  router.route("/socialprofiles/:id").delete(requireAuth, controller.deleteRecord);
};
