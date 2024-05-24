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
 * - children<Any>: Text to be used for the label.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function LabelA({mode, children, style}) {
    return (
        <Box
            className={`label-${mode}`}
            sx={{...{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                paddingY: "2px",
                paddingX: "8px",
                borderRadius: "4px"
            }, ...style}}
        >
            {children}
        </Box>
    );
};

//Control panel settings for storybook 
LabelA.propTypes = {
    //Label type
    mode: PropTypes.oneOf(['orange', 'gray', 'brand', 'success']),

    //Label text
    children: PropTypes.string.isRequired
};

//Default values for this component
LabelA.defaultProps = {
    style: {}
};