const controller = require("../controllers/fileName");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/filenames").get(controller.showAll);
    router.route("/filenames/:id").get(controller.showOne);
    router.route("/filenames").post(controller.createRecord);
    router.route("/filenames").put(controller.updateRecord);
    router.route("/filenames/:id").delete(controller.deleteRecord);
};