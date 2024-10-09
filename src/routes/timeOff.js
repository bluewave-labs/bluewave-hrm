const controller = require("../controllers/timeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffs").get(requireAuth, controller.showAll);
  router.route("/timeoffs/:id").post(requireAuth, controller.showOne);
  router.route("/timeoffs").post(requireAuth, controller.createRecord);
  router.route("/timeoffs").put(requireAuth, controller.updateRecord);
  router.route("/timeoffs/:id").delete(requireAuth, controller.deleteRecord);
  router.route("/timeoffs/deletion/initiate").post(requireAuth, controller.initiateDeletion);
  router.route("/timeoffs/deletion/confirm").delete(requireAuth, controller.confirmDeletion);
  router.route("/timeoffs/renewaldate/set").post(requireAuth, controller.setRenewalDate);
  router.route("/timeoffs/renewaldate/get").get(requireAuth, controller.getRenewalDate);
};

