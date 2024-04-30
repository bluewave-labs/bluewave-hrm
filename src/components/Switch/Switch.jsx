import PropTypes from 'prop-types';
import './Switch.css';

/**
 * Switch components for both HRM and Onboarding applications.
 * 
 */
export default function Switch() {
    return (
        <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
        </label>
    );
};

Switch.propTypes = {};

Switch.defaultProps = {};