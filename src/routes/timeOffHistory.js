const controller = require("../controllers/timeOffHistory");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/timeoffhistories").get(requireAuth, controller.showAll);
  router.route("/timeoffhistories/:id").post(requireAuth, controller.showOne);
  router.route("/timeoffhistories/employee/:empid").post(requireAuth, controller.showAllByEmployee);
  router.route("/timeoffhistories").post(requireAuth, controller.createRecord);
  router.route("/timeoffhistories").put(requireAuth, controller.updateRecord);
  router.route("/timeoffhistories/:id").delete(requireAuth, controller.deleteRecord);
};
