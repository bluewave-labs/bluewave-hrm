import Box from "@mui/system/Box";
import UserDropdown from "./UserDropdown";
import Logo from "../../assets/images/enthalpy_logo_text.svg";


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
export default function Header({user, style, actions }) {
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
      <img src={Logo} alt="Company Logo" />
      <UserDropdown user={user} actions={actions} />
    </Box>
  );
}

//Control panel settings for storybook
Header.propTypes = {};

//Default values for this component
Header.defaultProps = {};
