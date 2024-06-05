const controller = require("../controllers/administratorPermission");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/administratorpermissions").get(controller.showAll);
  router.route("/administratorpermissions/:adminid").post(controller.showOne);
  router.route("/administratorpermissions").post(controller.createRecord);
  router.route("/administratorpermissions").put(controller.updateRecord);
  router.route("/administratorpermissions/:id").delete(controller.deleteRecord);
};
