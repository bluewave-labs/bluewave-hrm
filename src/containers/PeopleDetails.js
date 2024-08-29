import { useContext, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  TableCell,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import AppTable from "../components/PeopleComponents/AppTable";
import AppTabs from "../components/PeopleComponents/AppTabs";
import { formatPhoneNumber } from "../assets/utils";
import StateContext from "../context/StateContext";

const tableView = require("../assets/table-view.json");
const api = require("../assets/FetchServices");
// Number of rows to display on the table at a time.
const rowsPerPage = 10;

// Expected headCell format for the table. Each object represents a
// column. Note, AppTable implementation depends on this format to make the
// table generic. Modification to this format may result in unpredictable outcome.
// const headCells = [
//   { id: "empId", width: 50, label: "Emp No", visible: false },
//   { id: "name", width: 221, label: "Name", visible: true },
//   { id: "preferredName", width: 100, label: "Preferred Name", visible: false },
//   { id: "role", width: 176, label: "Role", visible: true },
//   { id: "team", width: 210, label: "Team", visible: true },
//   { id: "manager", width: 150, label: "Manager", visible: true },
//   { id: "department", width: 100, label: "Department", visible: true },
//   { id: "phoneNumber", width: 100, label: "Phone", visible: true },
//   { id: "email", width: 200, label: "Email", visible: true },
//   { id: "gender", width: 50, label: "Gender", visible: true },
//   { id: "nationality", width: 100, label: "Nationality", visible: true },
//   { id: "dateOfBirth", width: 100, label: "Birthday", visible: true },
//   { id: "maritalStatus", width: 100, label: "Marital Status", visible: true },
//   { id: "hireDate", width: 182, label: "Hire Date", visible: true },
//   { id: "salary", width: 100, label: "Salary", visible: true },
//   { id: "employmentType", width: 100, label: "Emp Type", visible: true },
//   { id: "compensationType", width: 100, label: "Comp. Type", visible: true },
//   { id: "weeklyHours", width: 50, label: "Hours", visible: true },
// ];

function formatTableData(data, headCells) {
  //Inner function to create formatted TableCells
  const createTableCell = (item, key) => {
    return <TableCell key={key}> {item ? item : " "}</TableCell>;
  };

  data.forEach(async (emp) => {
    emp.name = `${emp.firstName} ${emp.lastName}`;
    emp.role = emp.role && emp.role.roleTitle;
    emp.team = emp.team && emp.team.teamName;
    emp.department = emp.department && emp.department.departmentName;
    emp.manager =
      emp.Manager && `${emp.Manager.firstName} ${emp.Manager.lastName}`;
    emp.salary = Number(emp.salary).toLocaleString();
    emp.hireDate = emp.hireDate && dayjs(emp.hireDate).format("DD MMMM, YYYY");
    emp.dateOfBirth =
      emp.dateOfBirth && dayjs(emp.dateOfBirth).format("DD MMMM, YYYY");
    emp.phoneNumber = formatPhoneNumber(emp.phoneNumber);
  });

  const getHeadCellIds = (headCellObj) => headCellObj.map((obj) => obj["id"]);
  const keys = getHeadCellIds(headCells);
  data.forEach((row) => {
    const newData = [];

    keys.map((key, index) => {
      let cell;
      if (key === "name") {
        cell = createTableCell(
          <Stack direction="row" spacing={1}>
            <Avatar
              sx={{ width: 25, height: 25 }}
              alt={row.name}
              src={"data:image/png;base64," + atob(row.photo)}
            />
            <Box sx={{ paddingTop: 0.5 }}>{row.name}</Box>
          </Stack>,
          index
        );
      } else {
        cell = createTableCell(row[key], index);
      }
      newData.push(cell);
    });
    if (newData.length > 0) {
      row["cells"] = newData;
    }
  });
}
const tabItems = ({isAdmin, employees, headCells, handleClick, hasTeam, team, terminated }) => {
  const tabs = [
    {
      label: "Directory",
      child: (
        <AppTable
          caption={"Company members"}
          headCells={headCells}
          data={employees}
          rowsPerPage={rowsPerPage}
          handleSelection={(selectedData) => handleClick(selectedData)}
        />
      ),
    },
  ];

  if (hasTeam) {
    const teamTab = {
      label: "My Team",
      child: (
        <AppTable
          caption={"People in my team"}
          headCells={headCells}
          data={team}
          rowsPerPage={rowsPerPage}
          handleSelection={(selectedData) => handleClick(selectedData)}
        />
      ),
    };
    tabs.push(teamTab);
  }

  if (isAdmin) {
    const teamTab = {
      label: "Terminated Employees",
      child: (
        <AppTable
          caption={"Terminated employees"}
          headCells={headCells}
          data={terminated}
          rowsPerPage={rowsPerPage}
          handleSelection={(selectedData) => handleClick(selectedData)}
        />
      ),
    };
    tabs.push(teamTab);
  }
  return tabs;
};

/**
 * This component was designed to demonstrate other components such as
 * AppTable, AppTablePagination, AppTab, and AppDatePickers.
 * @returns A React component.
 */
export default function People(props) {
  const stateContext = useContext(StateContext);
  const { onClick } = props;
  const [employees, setEmployees] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [terminated, setTerminated] = useState([]);
  const isAdmin =
    stateContext.state.user && stateContext.state.user.permission.id === 1;
  const headCells = isAdmin ? tableView.admin : tableView.others;
  //permission.id 1 is for admin, 2 for managers, 3 for employees
  const hasTeam =
    stateContext.state.user && stateContext.state.user.permission.id < 3;

  //data will be null if add new button is pressed or selected employee.
  const handleClick = (data) => {
    if (onClick && isAdmin) {
      onClick(data);
    } else if (
      data &&
      onClick &&
      stateContext.state.employee &&
      data.managerId === stateContext.state.employee.empId
    ) {
      // Manager can edit his or her team member's info
      onClick(data);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const res = await api.employee.fetchAll();
        formatTableData(res, headCells);
        setEmployees(res);
        if (stateContext.state.employee) {
          const managerId = stateContext.state.employee.empId;
          const team = await api.employee.fetchMyTeam(managerId);
          formatTableData(team, headCells);
          setMyTeam(team);
        }
        if(isAdmin){
          const terms = await api.employee.fetchTerminated();
          formatTableData(terms, headCells);
          setTerminated(terms);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Stack>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: "87px",
          mt: 5,
          mb: -5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          id="tableTitle"
          component="div"
          color={"inherent"}
          fontWeight={600}
        >
          People
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            disableElevation
            onClick={(evt) => handleClick(null)}
            sx={{
              width: "166px",
              height: "34px",
              border: "1px solid #7F56D9",
              backgroundColor: "#7F56D9",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#602ece",
                border: "1px solid #602ece",
              },
            }}
          >
            Add new employee
          </Button>
        )}
      </Box>

      <Stack
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          minHeight: "1345px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #EBEBEB",
          pt: 7.5,
          pb: 4,
          pr: 4,
          pl: 5,
          mt: 0,
        }}
      >
        {
          <AppTabs
            items={tabItems({
              isAdmin,
              employees,
              hasTeam,
              team: myTeam,
              headCells,
              handleClick,
              terminated
            })}
          />
        }
      </Stack>
    </Stack>
  );
}
