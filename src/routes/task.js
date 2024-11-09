const controller = require("../controllers/task");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/tasks").get(controller.showAll);
    router.route("/tasks/:id").get(controller.showOne);
    router.route("/tasks/onboarding/:onboardingid").get(controller.showAllByOnboarding);
    router.route("/tasks").post(controller.createRecord);
    router.route("/tasks").put(controller.updateRecord);
    router.route("/tasks/:id").delete(controller.deleteRecord);
};