const controller = require("../controllers/offBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/offboarding").get(controller.showAll);
  router.route("/offboarding/:id").post(controller.showOne);
  router.route("/offboarding").post(controller.createRecord);
  router.route("/offboarding").put(controller.updateRecord);
  router.route("/offboarding/:id").delete(controller.deleteRecord);
};
