import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Typography, Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import Stack from "@mui/system/Stack";
import Checkbox from "../Checkbox/Checkbox";

const TextHeader = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
});

const TableHeaderCell = styled(TableCell)({
  color: colors.darkGrey,
  paddingTop: "10px",
  paddingBottom: "10px",
});

const TableBodyCell = styled(TableCell)({
  color: colors.darkGrey,
  paddingTop: "25px",
  paddingBottom: "25px",
});

export default function PermissionsTable({ columns, contentList, style }) {
  return (
    <TableContainer
      sx={{
        minWidth: "885px",
        fontFamily: fonts.fontFamily,
        ...style,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            {columns?.map(({ header }) => (
              <TableHeaderCell key={header}>
                <TextHeader>{header}</TextHeader>
              </TableHeaderCell>
            ))}
            <TableHeaderCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => (
            <TableRow key={item.id}>
              {columns?.map(({ header, contentKey }, index) => (
                <TableBodyCell key={contentKey}>
                  {header === "Admin" ||
                  header === "Manager" ||
                  header === "Employee" ? (
                    <Checkbox
                      type="radio"
                      id="permission"
                      name="permission"
                      value="full"
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        lineHeight: "20px",
                        fontWeight: index === 0 ? "500" : "400",
                        color: index === 0 ? "#101828" : "#475467",
                        fontSize: index === 0 ? "14px" : "13px",
                      }}
                    >
                      {item[contentKey]}
                    </Typography>
                  )}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
