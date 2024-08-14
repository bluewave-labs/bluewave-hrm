import Stack from "@mui/system/Stack";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fonts } from "../../assets/Styles";
import { Typography } from "@mui/material";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";

/**
 * Header component for displaying the current user's information.
 *
 * Props:
 * - user<Object>: Object containing the user's information including avatar, name and role.
 *      Syntax: {avatar: <image source>, name: <string>, role: <string>}
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 *
 * - actions<Object>: Array of objects in which each object contains a label and action.
 *     Syntax: [...{label: <string>, action: <function>]
 */
export default function UserDropdown({ user, style, actions }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        ...{
          alignItems: "center",
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <Avatar alt={user.name} src={user.avatar} />
      <Stack
        spacing={1}
        sx={{
          textAlign: "center",
        }}
      >
        <b>{user.name}</b>
        <p>{user.role}</p>
      </Stack>
      <Typography onClick={actions && actions.length > 0 && handleClick}>
        {open && <KeyboardArrowUpIcon />}
        {!open && <KeyboardArrowDownIcon />}
      </Typography>
      {/*Popover will be only if exists at least an action*/}
      {actions && actions.length > 0 && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ mt: 2 }}
        >
          <List sx={{ width: "200px" }}>
            {actions.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{ paddingTop: "0.5px", paddingBottom: "0.5px" }}
                    onClick={() => {
                      handleClose();
                      item.action();
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{ fontFamily: fonts.fontFamily }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Popover>
      )}
    </Stack>
  );
}

//Control panel settings for storybook
UserDropdown.propTypes = {};

//Default values for this component
UserDropdown.defaultProps = {};
