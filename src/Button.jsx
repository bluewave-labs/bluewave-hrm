import PropTypes from 'prop-types';
import './Button.css';

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

Button.propTypes = {
    //Button type
    mode: PropTypes.oneOf(['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']),

    //Button text
    label: PropTypes.string.isRequired,

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

