import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button components for both HRM and Onboarding applications. Can be configured to be a primary,
 * secondary, tertiary or error button using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the button. 
 *      Valid values: ['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']
 * 
 * - label<String>: Text to be used for the button label.
 * 
 * - enabled<Boolean>: Flag determining whether the button is enabled or disabled.
 */
export default function Button({mode, label, enabled}) {
    return (
        <button
            className={["button", `button-${mode}`].join(' ')}
            disabled={!enabled}
        >
            {label}
        </button>
    );
};

//Control panel settings for storybook 
Button.propTypes = {
    //Button type
    mode: PropTypes.oneOf(['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']),

    //Button text
    label: PropTypes.string.isRequired,

    //Button enabled flag
    enabled: PropTypes.bool,

    //Behaviour when clicked
    onClick: PropTypes.func
};

//Default values for this component in storybook
Button.defaultProps = {
    mode: 'primary',
    label: 'Button',
    enabled: true,
    onClick: undefined
};

