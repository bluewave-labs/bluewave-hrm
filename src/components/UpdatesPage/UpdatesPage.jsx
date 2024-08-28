<<<<<<< HEAD
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Header from '../StaticComponents/Header';
import SideMenu from '../StaticComponents/SideMenu';
import UpdatesMenu from './UpdatesMenu';
import { colors, fonts } from '../../Styles';

/**
 * Home page of the HRM application.
=======
import Stack from '@mui/system/Stack';
import Page from '../StaticComponents/Page';
import UpdatesMenu from './UpdatesMenu';

/**
 * Home page of the HRM application. Contains the updates menu.
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
<<<<<<< HEAD
 */
export default function UpdatesPage({style}) {
    return (
        <Box sx={{...{
            width: "100%", 
            height: "100%", 
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
                        sx={{
                            width: "100%", 
                            justifyContent: "space-between",
                            marginBottom: "40px",
                            color: colors.darkGrey
                        }}
                    >
                        <h3>Hello, Gabriel</h3>
                        <p>Today is Monday, June 6, 2024</p>
                    </Stack>
                    <UpdatesMenu />
                </Box>
            </Box>
        </Box>
=======
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function UpdatesPage({style, innerStyle}) {
    return (
        <Page style={style} innerStyle={innerStyle}>
            <Stack 
                direction="row" 
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "40px",
                    minWidth: "1042px"
                }}
            >
                <h3>Hello, Gabriel</h3>
                <p>Today is Monday, June 6, 2024</p>
            </Stack>
            <UpdatesMenu />
        </Page>
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    );
};

//Control panel settings for storybook
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
<<<<<<< HEAD
    args: {
        style: {}
    }
=======
    style: {},
    innerStyle: {}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
};