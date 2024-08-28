import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import SuccessImage from '../../Images/Success_HR_Management_1.0.png';
<<<<<<< HEAD
=======
import { colors, fonts } from '../../Styles';
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea

/**
 * Setup menu component for onboarding purposes. Lets the user know that they are finished the
 * onboarding process
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SuccessMenu({style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingY: 8,
<<<<<<< HEAD
            paddingX: 40,
            fontFamily: "Inter, sans-serif",
=======
            paddingX: 0,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
            textAlign: "center"
        }, ...style}}>
            {/*Text and image*/}
            <Stack spacing={3}>
<<<<<<< HEAD
                <img src={SuccessImage} alt="Image" />
=======
                <img style={{margin: "1em auto", width: "148px", height: "148px"}} src={SuccessImage} alt="Image" />
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
                <h3>Well done!</h3>
                <p>You have completed the initial setup</p>
            </Stack>
            {/*Complete setup button*/}
<<<<<<< HEAD
            <HRMButton mode="primary" label="Dismiss and complete setup" style={{
                marginTop: "40px"
            }}/>
=======
            <HRMButton mode="primary" style={{
                marginTop: "40px"
            }}>
                Dismiss and complete setup
            </HRMButton>
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        </Box>
    );
};

//Control panel settings for storybook
SuccessMenu.propTypes = {};

//Default values for this component
SuccessMenu.defaultProps = {};