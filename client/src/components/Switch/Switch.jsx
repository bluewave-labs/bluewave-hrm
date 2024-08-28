import PropTypes from 'prop-types';
import './Switch.css';

/**
 * Switch components for both HRM and Onboarding applications.
 * 
 * Props:
 * - id<String>: Standard input id attribute
 * 
 * - name<String>: Standard input name attribute
 * 
 * - value<String>: Standard input value attribute
 * 
 * - enabled<Boolean>: Flag determining whether the switch is enabled or disabled.
 *      Default: true
 */
export default function Switch({id, name, value, enabled}) {
    return (
        <label class="switch">
            <input type="checkbox" id={id} name={name} value={value} disabled={!enabled} />
            <span class="slider round"></span>
        </label>
    );
};

//Control panel settings for storybook 
Switch.propTypes = {
    enabled: PropTypes.bool
};

//Default values for this component
Switch.defaultProps = {
    enabled: true
};