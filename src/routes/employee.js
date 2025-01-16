const controller = require("../controllers/employee");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
  router.route("/employees").get(requireAuth, controller.showAll);
  router.route("/terminated").get(requireAuth, controller.showAllTerminated);
  router.route("/managers").get(requireAuth, controller.showManagers);
  router.route("/employees/:id").post(requireAuth, controller.showOne);
  router.route("/employees/find/myteam/").post(requireAuth, controller.showMyTeam);
  router.route("/employees/find/email").post(requireAuth, controller.findOneByEmail);
  router.route("/employees/onboarding/done").post(requireAuth, controller.finalizeOnboarding);
  router.route("/employees").post(requireAuth, controller.createRecord);
  router.route("/employees").put(requireAuth, controller.updateRecord);
  router.route("/employees/").delete(requireAuth, controller.deleteRecord);
  router.route("/employees/manager/remove").post(requireAuth, controller.removeEmployeeManager);
  router.route("/employees/manager/change").post(requireAuth, controller.changeEmployeeManager);
  router.route("/employees/manager/none").get(requireAuth, controller.showEmployeeWithNoManager);
  router.route("/employees/manager/list").get(requireAuth, controller.showManagers);
  // Statistics/summary routes
  router
    .route("/employees/summaries/departments")
    .get(requireAuth, controller.summarizeByDepartments);
  router
    .route("/employees/summaries/jobtitles")
    .get(requireAuth, controller.summarizeByJobTitles);

  router
    .route("/employees/summaries/nationalities")
    .get(requireAuth, controller.summarizeByNationalities);

  router
    .route("/employees/summaries/locations")
    .get(requireAuth, controller.summarizeByLocations);
  // endpoint for chart
  router
    .route("/employees/summaries/departments/chartdata")
    .get(requireAuth, controller.summarizeByDepartmentsChartData);

  router
    .route("/employees/summaries/headcounts/:year")
    .get(requireAuth, controller.summarizeByHeadcounts);

  // Bulk change routes
  router
    .route("/employees/change/department")
    .post(requireAuth, controller.changeDepartment);
  router.route("/employees/change/job").post(requireAuth, controller.changeJob);
};
