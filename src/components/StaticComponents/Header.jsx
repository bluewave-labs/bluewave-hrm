import Box from "@mui/system/Box";
import UserDropdown from "./UserDropdown";
import { useContext } from "react";
import StateContext from "../../context/StateContext";

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
export default function Header({ style }) {
  const stateContext = useContext(StateContext);

  return (
    <Box
      sx={{
        ...{
          boxSizing: "border-box",
          width: "100%",
          height: "87px",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #EBEBEB",
          boxShadow: "0 10px 6px #10182808",
        },
        ...style,
      }}
    >
      <img
        src={stateContext.state.logo}
        alt="Company Logo"
        style={{
          maxWidth: "150px",
          maxHeight: "75px",
        }}
      />
      <UserDropdown />
    </Box>
  );
}

//Control panel settings for storybook
Header.propTypes = {};

//Default values for this component
Header.defaultProps = {};
