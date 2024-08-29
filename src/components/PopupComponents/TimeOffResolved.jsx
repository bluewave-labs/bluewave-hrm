import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for notifying the user that a time off request was approved or rejected.
 * 
 * Props:
 * - result<String>: Flag determining whether the time off request was approved or rejected
 * 
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffResolved(result, close, style) {
    return (
        <Box
            sx={{...{
                border: "1px solid #D0D5DD",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: "#FFFFFF",
                color: colors.darkGrey,
                fontFamily: fonts.fontFamily
            }, ...style}}
        >
            <Stack direction="row" alignItems="center" spacing={4}>
                {(result === "approved") ? 
                    <p>Time off request approved</p> : 
                    <p>Time off request rejected</p>}
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffResolved.propTypes = {
    //Flag determining whether the time off request was approved or rejected
    result: PropTypes.string,

    //The function to close this component
    close: PropTypes.func
};

//Default values for this component
TimeOffResolved.defaultProps = {
    style: {}
};