const controller = require("../controllers/companySocialProfile");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/companysocialprofiles").get(controller.showAll);
  router.route("/companysocialprofiles/:id").post(controller.showOne);
  router.route("/companysocialprofiles").post(controller.createRecord);
  router.route("/companysocialprofiles").put(controller.updateRecord);
  router.route("/companysocialprofiles/:id").delete(controller.deleteRecord);
};
