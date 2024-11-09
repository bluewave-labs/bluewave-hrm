const controller = require("../controllers/surveyResponse");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/surveyresponses").get(controller.showAll);
    router.route("/surveyresponses/:id").get(controller.showOne);
    router.route("/surveyresponses/employee/:empid").get(controller.showAllByEmployee);
    router.route("/surveyresponses/onboarding/:onboardingid").get(controller.showAllByOnboarding);
    router.route("/surveyresponses").post(controller.createRecord);
    router.route("/surveyresponses").put(controller.updateRecord);
    router.route("/surveyresponses/:id").delete(controller.deleteRecord);
};