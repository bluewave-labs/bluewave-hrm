const controller = require("../controllers/timeOffHistory");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffhistories").get(controller.showAll);
  router.route("/timeoffhistories/:empid").post(controller.showOne);
  router.route("/timeoffhistories").post(controller.createRecord);
  router.route("/timeoffhistories").put(controller.updateRecord);
  router.route("/timeoffhistories/:id").delete(controller.deleteRecord);
};
