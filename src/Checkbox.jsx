import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Checkbox components for both HRM and Onboarding applications. Can be configured to be a small or
 * large checkbox using prop values.
 * 
 * Props:
 * - type<String>: Determines the type of checkbox.
 *      Valid values: ['checkbox', 'radio']
 * 
 * - size<String>: Determines the size of the checkbox.
 *      Valid values: ['small', 'large']
 * 
 * - enabled<Boolean>: Flag determining whether the checkbox is enabled or disabled.
 * 
 * - 'id', 'name' and 'value' props may need to be added later to help with data submission.
 */
export default function Checkbox({type, size, enabled}){
    return (
        <input 
            className={[type, size].join(' ')}
            type={type}
            disabled={!enabled}
        />
    );
};

//Control panel settings for storybook
Checkbox.propTypes = {
    //Checkbox type
    type: PropTypes.oneOf(['checkbox', 'radio']),

    //Checkbox size
    size: PropTypes.oneOf(['small', 'large']),

    //Checkbox enabled flag
    enabled: PropTypes.bool
};

//Default values for this component in storybook
Checkbox.defaultProps = {
    type: 'checkbox',
    size: 'small',
    enabled: true
};