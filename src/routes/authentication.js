const controller = require("../controllers/authentication");
const { requireAuth } = require("../../config/authJwt");


module.exports = (router) => {
    router.route("/login").post(controller.login);
    router.route("/signup").post(controller.signup);
    router.route("/logout").post(controller.logout);
    router.route("/logout").get(controller.logout);
    router.route("/forgotpassword").post(controller.forgotPassword);
    router.route("/resetpassword/:token").patch(controller.resetPassword);
    router.route("/resetPasswordauth").patch(requireAuth, controller.resetPasswordAuth);
};