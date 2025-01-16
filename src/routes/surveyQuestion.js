const controller = require("../controllers/surveyQuestion");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
    router.route("/surveyquestions").get(controller.showAll);
    router.route("/surveyquestions/:id").get(controller.showOne);
    router.route("/surveyquestions").post(controller.createRecord);
    router.route("/surveyquestions").put(controller.updateRecord);
    router.route("/surveyquestions/:id").delete(controller.deleteRecord);
};