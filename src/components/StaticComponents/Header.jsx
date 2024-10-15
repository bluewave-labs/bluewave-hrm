import Box from "@mui/system/Box";
import { useScrollTrigger } from '@mui/material';
import UserDropdown from "./UserDropdown";
//import { useContext } from "react";
//import StateContext from "../../context/StateContext";

/**
 * Header component for most pages. Contains the company logo and the current user's information.
 *
 * Props:
 *
 * - user<Object>: Object containing the user's information including avatar, name and role.
 *      Syntax: {avatar: <image source>, name: <string>, role: <string>}
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 *
 *  - actions<Object>: Array of objects in which each object contains a label and action.
 *     Syntax: [...{label: <string>, action: <function>]
 */
export default function Header({window, style }) {
  //const stateContext = useContext(StateContext);

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0
});

  return (
    <Box className={trigger ? "scrolled" : ""} sx={{...{
        boxSizing: "border-box",
        width: "100%",
        height: "87px",
        padding: "20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "fixed",
        "&.scrolled": {
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #EBEBEB",
            boxShadow: "0 10px 6px #10182808",
            zIndex: 1
        }
      }, ...style}}
    >
      <UserDropdown />
    </Box>
  );
}

//Control panel settings for storybook
Header.propTypes = {};

//Default values for this component
Header.defaultProps = {};
