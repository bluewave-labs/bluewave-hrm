import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import SuccessImage from '../../Images/Success_HR_Management_1.0.png';

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
            paddingX: 40,
            fontFamily: "Inter, sans-serif",
            textAlign: "center"
        }, ...style}}>
            {/*Text and image*/}
            <Stack spacing={3}>
                <img src={SuccessImage} alt="Image" />
                <h3>Well done!</h3>
                <p>You have completed the initial setup</p>
            </Stack>
            {/*Complete setup button*/}
            <HRMButton mode="primary" label="Dismiss and complete setup" style={{
                marginTop: "40px"
            }}/>
        </Box>
    );
};

//Control panel settings for storybook
SuccessMenu.propTypes = {};

//Default values for this component in storybook
SuccessMenu.defaultProps = {};