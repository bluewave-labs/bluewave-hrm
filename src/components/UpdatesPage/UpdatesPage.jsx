import Stack from '@mui/system/Stack';
import { useContext } from "react";
import UpdatesMenu from './UpdatesMenu';
import StateContext from "../../context/StateContext";
import dayjs from 'dayjs';

/**
 * Home page of the HRM application. Contains the updates menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function UpdatesPage({style, innerStyle}) {
    const stateContext = useContext(StateContext);
    return (
       <>
            <Stack 
                direction="row" 
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "40px",
                    minWidth: "1042px"
                }}
            >
               {stateContext.state.user && <h3>Hello, {stateContext.state.user.firstName}</h3>}
                <p>Today is {dayjs().format("dddd, MMMM D, YYYY")}</p>
            </Stack>
            <UpdatesMenu />
</>
    );
};

//Control panel settings for storybook
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {},
    innerStyle: {}
};