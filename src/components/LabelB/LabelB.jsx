import Box from '@mui/system/Box';
import PropTypes from 'prop-types';
import './LabelB.css';

/**
 * Second variation of label components for both HRM and Onboarding applications. Can be configured
 * to be a 'seen', 'waiting' or 'new' label using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the label. 
 *      Valid values: ['seen', 'waiting', 'new']
 * 
 * - label<String>: Text to be used for the label.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function LabelB({type, label, style}) {
    return (
        <Box
            className="labelB"
            sx={style}
        >
            {type == "seen" && <span className="dot seen"></span>}
            {type == "waiting" && <span className="dot waiting"></span>}
            {type == "new" && <span className="dot new"></span>}
            {label}
        </Box>
    )
};

// Control panel settings for storybook 
LabelB.propTypes = {
    //Label type
    type: PropTypes.oneOf(['seen', 'waiting', 'new']),

    //Label text
    label: PropTypes.string.isRequired
};

//Default values for this component in storybook
LabelB.defaultProps = {
    type: 'seen',
    label: 'Seen',
    style: {}
};