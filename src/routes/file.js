const controller = require("../controllers/file");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/files").get(controller.showAll);
    router.route("/files/:id").get(controller.showOne);
    router.route("/files/onboarding/:onboardingid").get(controller.showAllByOnboarding);
    router.route("/files").post(controller.createRecord);
    router.route("/files").put(controller.updateRecord);
    router.route("/files/:id").delete(controller.deleteRecord);
};