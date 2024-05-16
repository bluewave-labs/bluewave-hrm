import {ButtonGroup, Button} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * ButtonGroup component for both HRM and Onboarding applications.
 * 
 * Props:
 * - buttonLabels<Array<String>>: Labels for each button in the button group. For each label in
 *      'buttonLabels', a new button with that label will be added to the button group.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function HRMButtonGroup({buttonLabels, style}) {
    return (
        <ButtonGroup 
            variant="outlined"
            sx={style}
        >
            {buttonLabels.map(label => {
                return <Button
                    sx={{
                        fontFamily: `"Inter", sans-serif`,
                        borderColor: "grey.400",
                        color: "grey.900",
                        borderRadius: 2,
                        "&:hover": {
                            cursor: 'pointer',
                            borderColor: "grey.400"
                        }
                    }}>
                        {label}
                    </Button>
            })}
        </ButtonGroup>
    );
};

//Control panel settings for storybook 
HRMButtonGroup.propTypes = {
    //Button labels
    buttonLabels: PropTypes.array
};

//Default values for this component in storybook
HRMButtonGroup.defaultProps = {
    buttonLabels: ['Text', 'Text', 'Text'],
    style: {}
};