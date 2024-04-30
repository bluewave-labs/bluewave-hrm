import PropTypes from 'prop-types';
import './Progress.css';

/**
 * Progress components for both HRM and Onboarding applications.
 * 
 * Props:
 * - value<String>: Standard progress value attribute. Represents total progress on the progress 
 *      bar. Must be a number between 0 and 100.
 */
export default function Progress({value}) {
    const progressWidth = {
        width: `${value}%`
    };
    return (
        <div className="wrapper">
            <span className="progressContainer">
                <span className="progress" style={progressWidth}></span>
            </span>
            {value}%
        </div>
    );
};

//Control panel settings for storybook
Progress.propTypes = {
    //Progress precentage
    value: PropTypes.string
};

//Default values for this component in storybook
Progress.defaultProps = {
    value: '30'
}