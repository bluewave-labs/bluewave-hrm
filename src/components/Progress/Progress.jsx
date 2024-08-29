import PropTypes from 'prop-types';
import './Progress.css';

/**
 * Progress components for both HRM and Onboarding applications.
 * 
 * Props:
 * - value<String>: Standard progress value attribute. Represents total progress on the progress 
 *      bar. Must be a number between 0 and 100.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function Progress({value, style}) {
    const progressWidth = {
        width: `${value}%`
    };
    return (
        <div className="wrapper" style={style}>
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

//Default values for this component
Progress.defaultProps = {
    style: {}
}