const api = require("./index").default;

export const runDepartmentTests = async () => {
  // console.log("Fetch all Departments", await api.fetchAll());
  // console.log("Fetching One Department", await api.fetchOne(2));
  // console.log(
  //   "Does Product Management exist?",
  //   await api.exists("Product Management")
  // );
  // console.log(
  //   "Does Area Management exist?",
  //   await api.exists("Area Management")
  // );
  const data = {
    email: "alissa.futter@bluewavelabs.ca",
    password: "Password1!s",
  };
  console.log("login api", await api.authentication.login(data));
};

//runDepartmentTests();

export const runEmployeeTests = async () => {
  const data = {
    email: "alissa.futter@bluewavelabs.ca",
    password: "Password1!",
  };
  console.log("Authenticated user", await api.authentication.login(data));

  console.log("Employee API Call Module Test");
  const employees = await api.employee.fetchAll();
  console.log("Test 1 - fetchAll", employees.length);
  console.log("Test 2 - fetchOne", await api.employee.fetchOne(1));
  console.log(
    "Test 3 - fetchOneByEmail",
    await api.employee.fetchOneByEmail("leigh.kaines@bluewavelabs.ca")
  );
  console.log("Test 4 - fetchManagers", await api.employee.fetchManagers());
  console.log("Test 5 createOne", await api.employee.createOne(newEmployee));
  console.log("Test 6 update", await api.employee.update(updateEmployee));
  console.log("Test 7 remove", await api.employee.remove(100));
  console.log("Test 8 fetchMyTeam", await api.employee.fetchMyTeam(1));
  console.log(
    "Test 9 fetchSummaryByDepartments",
    await api.employee.fetchSummaryByDepartments()
  );
  console.log(
    "Test 10 fetchSummaryByJobTitles",
    await api.employee.fetchSummaryByJobTitles()
  );
  console.log(
    "Test 11 fetchSummaryByNationality",
    await api.employee.fetchSummaryByNationalities()
  );
  console.log(
    "Test 12 fetchSummaryByLocation",
    await api.employee.fetchSummaryByLocations()
  );
  console.log(
    "Test 13 fetchDepartmentChartData",
    await api.employee.fetchDepartmentChartData()
  );
  console.log(
    "Test 14 fetchHeadCounts",
    await api.employee.fetchHeadCounts(2020)
  );

  const d = { destinationDepartmentId: 2, employeeEmpIds: [1, 2, 3] };
  console.log(
    "Test 15 changeDepartments",
    await api.employee.changeDepartments(d)
  );

  const d2 = { destinationRoleId: 3, employeeEmpIds: [1, 2, 3] };
  console.log("Test 16 changeRole", await api.employee.changeJobs(d2));
};

export const runRoleTests = async () => {
  let data = {
    email: "alissa.futter@bluewavelabs.ca",
    password: "Password1!",
  };
  console.log("auth", await api.authentication.login(data));
  console.log("Role API Call Module Test");

  //console.log("Test 1 - fetchAll", await api.role.fetchAll());
  //console.log("Test 2 - fetchOne", await api.role.fetchOne(2));
  data = {
    roleTitle: "Driver2",
    minimumSalary: 25000,
    maximumSalary: 125000000,
  };
  // console.log("Test 3 - createOne", await api.role.createOne(data));

  data = {
    roleId: 28,
    roleTitle: "Wrestler",
    minimumSalary: 9700,
    maximumSalary: 12200,
  };
  //console.log("Test 4 - update", await api.role.update(data));
  // console.log("Test 5 - remove", await api.role.remove(1));
  data = [
    { roleTitle: "Actor" },
    { roleTitle: "Director" },
    { roleTitle: "Stunts" },
    { roleTitle: "Editor" },
    { roleTitle: "Auditor" },
  ];
  // console.log("Test 6 - createMany", await api.role.createMany(data));
  console.log("Test 7 - check", await api.role.exists("Actor"));
};

export const runTeamTests = async () => {
  let data = {
    email: "alissa.futter@bluewavelabs.ca",
    password: "Password1!",
  };
  console.log("auth", await api.authentication.login(data));
  console.log("Role API Call Module Test");

  console.log("Test 1 - fetchAll", await api.team.fetchAll());
  console.log("Test 2 - fetchOne", await api.team.fetchOne(2));
  data = {
    teamName: "Construction",
    teamLeadId: 65,
    teamDescription:
      "et id donec ultrices tincidunt arcu non. Tortor vitae purus faucibus ornare",
  };
  console.log("Test 3 - createOne", await api.team.createOne(data));
  data = {
    id: 2,
    teamName: "Management23",
    teamLeadId: 99,
    teamDescription:
      "et id donec ultrices tincidunt arcu non. Tortor vitae purus faucibus ornare",
  };
  console.log("Test 4 - update", await api.team.update(data));
  console.log("Test 5 - remove", await api.team.remove(4));
};

export const runChangeHistoryTests = async () => {
  let data = {
    email: "alissa.futter@bluewavelabs.ca",
    password: "Password1!",
  };

  console.log("auth", await api.authentication.login(data));
  console.log("HistoryChange API Call Module Test");
  data = {
    empId: 1,
    date: "2023-12-04T17:58:42.999Z",
    changeType: "Department Change",
    changeFrom: "Human Resources",
    changeTo: "Caym",
  };

  console.log("Test 1 - fetchAll", await api.changeHistory.fetchAll());
  console.log("Test 2 - fetchOne", await api.changeHistory.fetchOne(1));
  console.log("Test 3 - createOne", await api.changeHistory.createOne(data));
   data = {
    id: 3,
    empId: 2,
    date: new Date(),
    changeType: "Department Change",
    changeFrom: "Human Resources",
    changeTo: "Legal",
  };
  console.log("Test 4 - update", await api.changeHistory.update(data));
  console.log("Test 5 - remove", await api.changeHistory.remove(88));
};

//runChangeHistoryTests();

//runTeamTests();

//runEmployeeTests();
//runRoleTests();
//Employee test data
const updateEmployee = {
  empId: 101,
  firstName: "Zebra",
  lastName: "Brown",
  preferredName: "zeb",
  gender: "Male",
  email: "alissa.futter@bluewavelabs.ca",
};

const newEmployee = {
  firstName: "Jon",
  lastName: "Doe",
  preferredName: "jd",
  gender: "Female",
  nationality: "Panamanian",
  dateOfBirth: "1952-04-18T19:17:57.434Z",
  maritalStatus: "Divorced",
  email: "jon.doe2@bluewavelabs.ca",
  phoneNumber: "6045767422",
  hireDate: "2014-12-30T05:03:51.578Z",
  roleId: 11,
  salary: 10122,
  managerId: 65,
  departmentId: 7,
  employmentType: "Leased employment",
  compensationType: "Salary & commission",
  effectiveDate: "2014-12-30T05:03:51.578Z",
  weeklyHours: 24,
  photo: null,
  officeLocation: "Walnut Grove",
  teamId: 2,
  emergencyContactName: "John Chin",
  emergencyContactRelationship: "Father",
  emergencyContactPhoneNumber: "5877332379",
  streetAddress: "00900 Oakridge Alley",
  unitSuite: "Apt 1765",
  city: "Stony Plain",
  country: "Canada",
  stateProvince: "Alberta",
  postalZipCode: "L5V 1E5",
  createdAt: "2024-07-20T02:58:07.776Z",
  updatedAt: "2024-07-20T02:58:07.776Z",
};
