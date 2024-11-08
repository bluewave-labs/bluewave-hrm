const controller = require("../controllers/notification");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    //GET(all notifications)
    router.route("/notifications").get(requireAuth, controller.showAll);
    //GET(single notification)
    router.route("/notifications/:id").get(requireAuth, controller.showOne);
    //GET(all notifications for a given employee)
    router.route("/notifications/employee/:id").get(requireAuth, controller.showAllByEmployee);
    //POST
    router.route("/notifications").post(requireAuth, controller.createRecord);
    //PUT
    router.route("/notifications").put(requireAuth, controller.updateRecord);
    //DELETE
    router.route("/notifications/:id").delete(requireAuth, controller.deleteRecord);
};