import Box from '@mui/system/Box';

/**
 * Logo component to be displayed on the home menu when there are no updates to display
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function NoUpdatesLogo({style}) {
    return (
        <Box sx={{...{
            width: "256px",
            border: "1px solid #EBEBEB",
            borderRadius: "8px",
            padding: "18px"
        }, ...style}}>
            <Box sx={{
                width: "85px",
                height: "13px",
                borderRadius: "3px",
                backgroundColor: "#D9D9D9",
                marginBottom: "20px"
            }}/>
            <Box sx={{
                width: "100%",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#F3F3F3",
                marginBottom: "13px"
            }}/>
            <Box sx={{
                width: "100%",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#F3F3F3",
                marginBottom: "13px"
            }}/>
            <Box sx={{
                width: "100%",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#F3F3F3"
            }}/>
        </Box>
    );
};

//Control panel settings for storybook
NoUpdatesLogo.propTypes = {};

//Default values for this component
NoUpdatesLogo.defaultProps = {
    style: {}
};