const controller = require("../controllers/update");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/updates").get(controller.showAll);
    router.route("/updates/:id").get(controller.showOne);
    router.route("/updates").post(controller.createRecord);
    router.route("/updates/:id").put(controller.updateRecord);
    router.route("/updates/:id").delete(controller.deleteRecord);
};