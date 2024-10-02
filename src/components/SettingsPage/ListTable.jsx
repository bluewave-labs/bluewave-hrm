import { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Typography, Button, Menu, MenuItem, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";

const TextHeader = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
});

const EditButton = styled(Button)({
  textTransform: "none",
  color: "#7F56D9",
  textDecoration: "none",
  fontWeight: "600",
});

const DeleteButton = styled(Button)({
  textTransform: "none",
  color: "#475467",
  textDecoration: "none",
  fontWeight: "600",
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

export default function ListTable({ openDialog, columns, contentList, style }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
            <TableHeaderCell>
              <TextHeader>Actions</TextHeader>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => (
            <TableRow key={item.id}>
              {columns?.map(({ header, contentKey }, index) => (
                <TableBodyCell key={contentKey}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      lineHeight: "20px",
                      fontWeight: index === 0 ? "500" : "400",
                      color: index === 0 ? "#101828" : "#475467",
                      fontSize: index === 0 ? "14px" : "13px",
                    }}
                  >
                    {header === "Default balance"
                      ? `${item[contentKey]} days`
                      : header === "Hours used"
                        ? `${item[contentKey]} hours`
                        : item[contentKey]}
                  </Typography>
                </TableBodyCell>
              ))}
              <TableBodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Stack direction="row" spacing={2}>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{ margin: "0px", padding: "0px", minWidth: "0px" }}
                      >
                        <MoreVertIcon sx={{ color: "#98A2B3" }} />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            openDialog("edit", item);
                            handleCloseMenu();
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openDialog("delete", item);
                            handleCloseMenu();
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </Stack>
                  {/* <EditButton onClick={() => openDialog("edit", item)}>
                    Edit
                  </EditButton> */}
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
