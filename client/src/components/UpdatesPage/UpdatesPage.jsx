import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Header from '../StaticComponents/Header';
import SideMenu from '../StaticComponents/SideMenu';
import UpdatesMenu from './UpdatesMenu';
import { colors, fonts } from '../../Styles';

/**
 * Home page of the HRM application. Contains the updates menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesPage({style}) {
    return (
        <Box sx={{...{
            width: "100%", 
            height: "100%", 
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Header*/}
            <Header />
            <Box sx={{
                display: "flex",
                flexDirection: "row", 
                width: "100%", 
                height: "100%", 
                backgroundColor: "#F9FAFB"
            }}>
                {/*Side menu*/}
                <Box>
                    <SideMenu />
                </Box>
                <Box sx={{
                    paddingX: "75px", 
                    paddingY: "40px", 
                    width: "100%",
                    height: "100%"
                }}>
                    {/*Main page content*/}
                    <Stack 
                        direction="row" 
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginBottom: "40px"
                        }}
                    >
                        <h3>Hello, Gabriel</h3>
                        <p>Today is Monday, June 6, 2024</p>
                    </Stack>
                    <UpdatesMenu />
                </Box>
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {}
};