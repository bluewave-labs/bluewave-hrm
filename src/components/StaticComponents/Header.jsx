import Box from "@mui/system/Box";
import { useScrollTrigger } from '@mui/material';
import UserDropdown from "./UserDropdown";

/**
 * Header component for most pages. Contains the company logo and the current user's information.
 *
 * Props:
 * - window: Used to handle changes to the header when scrolling
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function Header({window, style}) {
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
        height: "64px",
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
