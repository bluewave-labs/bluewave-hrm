import { useMemo, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Box, Stack, Typography, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import TablePagination from "./AppTablePagination";
import FilterButton from "../components/FilterButton";

// This is a utility function to create a custom React element.
function TableToolbar(props) {
  const { caption, count, column, setColumnData } = props;
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        color={"inherent"}
      >
        {caption}
      </Typography>
      {count !== null && (
        <Typography
          sx={{
            color: "#6941C6",
            backgroundColor: "#F9F5FF",
            ml: 2,
            pl: 1,
            pr: 1,
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
          border={2}
          borderRadius={"30%"}
          borderColor={"#E9D7FE"}
        >
          {count}
        </Typography>
      )}
      <Box
        sx={{ flex: "1 1 40%" }}
        display={"flex"}
        justifyContent={"right"}
        alignContent={"right"}
      >
        <FilterButton columnData={column} setColumnData={setColumnData} />
      </Box>
    </Toolbar>
  );
}
TableToolbar.propTypes = {
  caption: PropTypes.string,
  count: PropTypes.number,
  searchRequest: PropTypes.func.isRequired,
};

//Utility function to get the column names
const getColumnName = (data) => {
  const columnNames = [];
  for (let item of data) {
    if (item.visible) {
      columnNames.push(item["id"]);
    }
  }
  return columnNames;
};

// Utility function to create a TableRow.
function CreateTableRow(headCell, headCellIds, row, rowIndex, handleSelection) {
  if (row.cells) {
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={rowIndex}
        sx={{ cursor: "pointer" }}
        onClick={() => handleSelection(row)}
      >
        {row.cells.map((cell, index) => {
          if (headCell[index].visible) {
            return cell;
          }
        })}
      </TableRow>
    );
  }
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={rowIndex}
      sx={{ cursor: "pointer" }}
      onClick={() => handleSelection(row)}
    >
      {headCellIds.map((key, index) => {
        if (row[key]) {
          return (
            <TableCell key={index} align="left">
              {row[key]}
            </TableCell>
          );
        } else {
          return (
            <TableCell key={index} align="left">
              {""}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
}

// This function sorts element of the object array
function sortData(data, order = "asc", orderBy) {
  const descComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  if (order.toLowerCase() === "asc")
    return data.slice().sort((a, b) => -descComparator(a, b, orderBy));

  return data.slice().sort((a, b) => descComparator(a, b, orderBy));
}

/*
Utility function to format the tableHead.
@param props custom properties of the tableHead.
*/
function CustomisedTableHead(props) {
  const { headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
      <TableRow>
        {headCells.map((cell) => {
          if (cell.visible) {
            return (
              <TableCell
                key={cell.id}
                align="left"
                padding="none"
                sortDirection={orderBy === cell.id ? order : false}
                component="th"
                sx={{ width: cell.width, padding: 1 }}
              >
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : "asc"}
                  onClick={createSortHandler(cell.id)}
                >
                  {cell.label}
                  {orderBy === cell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}

// headCell required properties.
const headCellsPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  visible: PropTypes.bool,
});

CustomisedTableHead.propTypes = {
  headCells: PropTypes.arrayOf(headCellsPropTypes).isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

/**
 * This component renders a table with search and pagination.
 * @param {*} props Caption: It is the table title.
* headCells: An array of head cell properties (id, width, and label). 
The value of the id should match a key in the data object.
Label: This contains that column title. 
data: An array of data objects to be displayed. 
The cells property of the object is for formatting the TableCell Component. 
The properties of the object should match the values of the id property of 
the headCells.
 * @returns  {ReactNode} A Stack React element.
 */
export default function AppTable(props) {
  const { caption, headCells, data, rowsPerPage, handleSelection } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(1);
  const [column, setColumn] = useState(headCells);
  const [dataSize, setDataSize] = useState(data.length);

  const columnNames = getColumnName(headCells);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setDataSize(data.length);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDataChange = (startIndex, endIndex) => {
    return sortData(data, order, orderBy).slice(startIndex, endIndex);
  };

  const visibleRows = useMemo(
    () =>
      handleDataChange(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, column, dataSize]
  );

  return (
    <Stack spacing={5} sx={{ width: 900 }}>
      <Stack>
        <TableToolbar
          caption={caption ? caption : "Table"}
          count={data.length}
          rowsPerPage={rowsPerPage}
          column={headCells}
          setColumnData={(columnData) => setColumn(columnData)}
        />
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #EBEBEB",
            width: 889,
          }}
        >
          <Table sx={{ minWidth: 800 }} aria-label="app table">
            <CustomisedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                        return CreateTableRow(
                  headCells,
                  columnNames,
                  row,
                  index,
                  handleSelection
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <TablePagination
        count={data.length}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
      />
    </Stack>
  );
}
