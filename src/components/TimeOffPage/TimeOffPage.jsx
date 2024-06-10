import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Header from '../StaticComponents/Header';
import SideMenu from '../StaticComponents/SideMenu';
import TimeOffMenu from './TimeOffMenu';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';

/**
 * Time off page of the HRM application
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffPage({style}) {
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
                        <h3>Time off</h3>
                        <HRMButton mode="primary">Request new time off</HRMButton>
                    </Stack>
                    <TimeOffMenu />
                </Box>
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffPage.propTypes = {};

//Default values for this component
TimeOffPage.defaultProps = {
    style: {}
};