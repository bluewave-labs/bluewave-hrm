const controller = require("../controllers/timeOff");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffs").get(controller.showAll);
  router.route("/timeoffs/:id").post( controller.showOne);
  router.route("/timeoffs").post(controller.createRecord);
  router.route("/timeoffs").put(controller.updateRecord);
  router.route("/timeoffs/:id").delete(controller.deleteRecord);
  router.route("/timeoffs/deletion/initiate").post(controller.initiateDeletion);
  router.route("/timeoffs/deletion/confirm").delete(requireAuth, controller.confirmDeletion);
  router.route("/timeoffs/renewaldate/set").post(requireAuth, controller.setRenewalDate);
  router.route("/timeoffs/renewaldate/get").get(controller.getRenewalDate);
};


