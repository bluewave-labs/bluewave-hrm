const controller = require("../controllers/socialProfile");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/socialprofiles").get(controller.showAll);
  router.route("/socialprofiles/:empid").post(controller.showOne);
  router.route("/socialprofiles/find/url").post(controller.findOne);
  router.route("/socialprofiles").post(controller.createRecord);
  router.route("/socialprofiles").put(controller.updateRecord);
  router.route("/socialprofiles/:id").delete(controller.deleteRecord);
};
