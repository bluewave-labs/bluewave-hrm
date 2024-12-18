const controller = require("../controllers/video");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/videos").get(controller.showAll);
    router.route("/videos/:id").get(controller.showOne);
    router.route("/videos").post(controller.createRecord);
    router.route("/videos").put(controller.updateRecord);
    router.route("/videos/:id").delete(controller.deleteRecord);
};