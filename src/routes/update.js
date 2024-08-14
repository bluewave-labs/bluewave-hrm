const controller = require("../controllers/update");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    //GET(all notifications)
    router.route("/updates").get(controller.showAll);
    //GET(single notification)
    router.route("/updates/:id").get(controller.showOne);
    //POST
    router.route("/updates").post(controller.createRecord);
    //PUT
    router.route("/updates/:id").put(controller.updateRecord);
    //DELETE
    router.route("/updates/:id").delete(controller.deleteRecord);
};