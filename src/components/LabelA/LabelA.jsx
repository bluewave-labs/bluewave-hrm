import Box from '@mui/system/Box';
import PropTypes from 'prop-types';
import './LabelA.css';

/**
 * First variation of label components for both HRM and Onboarding applications. Can be configured
 * to be an orange, gray, purple(brand) or green(success) label using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the label. 
 *      Valid values: ['orange', 'gray', 'brand', 'success']
 * 
 * - label<String>: Text to be used for the label.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function LabelA({mode, label, style}) {
    return (
        <Box
            className={["labelA", `label-${mode}`].join(" ")}
            sx={style}
        >
            {label}
        </Box>
    );
};

//Control panel settings for storybook 
LabelA.propTypes = {
    //Label type
    mode: PropTypes.oneOf(['orange', 'gray', 'brand', 'success']),

    //Label text
    label: PropTypes.string.isRequired
};

//Default values for this component in storybook
LabelA.defaultProps = {
    mode: 'orange',
    label: 'label',
    default: {}
};