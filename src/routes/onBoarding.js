const controller = require("../controllers/onBoarding");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/onboarding").get(controller.showAll);
    router.route("/onboarding/:id").get(controller.showOne);
    router.route("/onboarding/employee/:empid").get(controller.showByEmployee);
    //router.route("/onboarding").post(controller.createRecord);
    router.route("/onboarding").put(controller.updateRecord);
    router.route("/onboarding/:id").delete(controller.deleteRecord);
    router.route("/onboarding/:empid/submit").post(controller.completeOnboarding);
};