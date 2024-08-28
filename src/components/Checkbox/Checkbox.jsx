import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Checkbox and radio components for both HRM and Onboarding applications. Can be configured to be 
 * a small or large checkbox or radio button using prop values.
 * 
 * Props:
 * - type<String>: Determines the type of checkbox.
 *      Valid values: ['checkbox', 'radio']
 *      Default: 'checkbox'
 * 
<<<<<<< HEAD
 * - id<String>: Standard input id attribute
 * 
 * - name<String>: Standard input name attribute
 * 
 * - value<String>: Standard input value attribute
=======
 * - id<String>: Standard input id attribute.
 * 
 * - name<String>: Standard input name attribute.
 * 
 * - value<String>: Standard input value attribute.
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
 * 
 * - size<String>: Determines the size of the checkbox.
 *      Valid values: ['small', 'large']
 *      Default: 'small'
 * 
<<<<<<< HEAD
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 * 
 * - enabled<Boolean>: Flag determining whether the checkbox is enabled or disabled.
 *      Default: true
 */
export default function Checkbox({type, id, name, value, size, style, enabled}){
    return (
        <input 
            className={[type, size].join(' ')}
            type={type}
            id={id}
            name={name}
            value={value}
            style={style}
            disabled={!enabled}
        />
    );
=======
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - onChange<Function>: Function to be executed when the checkbox value is changed.
 * 
 * - enabled<Boolean>: Flag determining whether the checkbox is enabled or disabled.
 *      Default: true
 */
export default function Checkbox({type, id, name, value, size, checked, style, onChange, enabled}) {
        return (
            (checked) ?
            <input 
                className={[type, size].join(' ')}
                type={type}
                id={id}
                name={name}
                value={value}
                style={style}
                onChange={onChange}
                disabled={!enabled}
                checked
            /> :
            <input 
                className={[type, size].join(' ')}
                type={type}
                id={id}
                name={name}
                value={value}
                style={style}
                onChange={onChange}
                disabled={!enabled}
            />
        );
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
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

//Default values for this component
Checkbox.defaultProps = {
    type: 'checkbox',
    size: 'small',
<<<<<<< HEAD
=======
    checked: false,
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    style: {},
    enabled: true
};