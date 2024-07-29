const controller = require("../controllers/employee");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/employees").get(controller.showAll);
  router.route("/managers").get(controller.showManagers);
  router.route("/employees/:id").post(controller.showOne);
  router.route("/employees/find/email").post(controller.findOneByEmail);
  router.route("/employees").post(controller.createRecord);
  router.route("/employees").put(controller.updateRecord);
  router.route("/employees/:id").delete(controller.deleteRecord);
  // Statistics/summary routes
  router
    .route("/employees/summaries/departments")
    .get(controller.summarizeByDepartments);
  router
    .route("/employees/summaries/jobtitles")
    .get(controller.summarizeByJobTitles);

  router
    .route("/employees/summaries/nationalities")
    .get(controller.summarizeByNationalities);

  router
    .route("/employees/summaries/locations")
    .get(controller.summarizeByLocations);
  // endpoint for chart
  router
    .route("/employees/summaries/departments/chartdata")
    .get(controller.summarizeByDepartmentsChartData);

  router
    .route("/employees/summaries/headcounts")
    .get(controller.summarizeByHeadcounts);

  // Bulk change routes
  router
    .route("/employees/change/department")
    .post(controller.changeDepartment);
  router.route("/employees/change/job").post(controller.changeJob);
};
