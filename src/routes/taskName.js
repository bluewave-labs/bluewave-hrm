const controller = require("../controllers/taskName");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/taskName").get(controller.showAll);
    router.route("/taskName/:id").get(controller.showOne);
    router.route("/taskName").post(controller.createRecord);
    router.route("/taskName").put(controller.updateRecord);
    router.route("/taskName/:id").delete(controller.deleteRecord);
}