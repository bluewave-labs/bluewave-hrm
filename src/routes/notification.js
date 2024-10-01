const controller = require("../controllers/notification");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  //GET(all notifications)
  router.route("/notifications").get(controller.showAll);
  //GET(single notification)
  router.route("/notifications/:id").get(controller.showOne);
  //GET(all notifications for a given employee)
  router.route("/notifications/employee/:id").get(controller.showAllByEmployee);
  //POST
  router.route("/notifications").post(controller.createRecord);
  //PUT
  router.route("/notifications").put(controller.updateRecord);
  //DELETE
  router.route("/notifications/:id").delete(controller.deleteRecord);
};
