import { styled } from '@mui/system';
<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
import PropTypes from 'prop-types';

/**
 * Button component for selecting deparmentments and roles in the SetupDepartmentsMenu and 
 * SetupRolesMenu components
 * 
 * Props:
 * - children<Any>: Text to be used for the button label
 * 
<<<<<<< HEAD
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SelectItem({children, style}) {
    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

=======
 * - state<Boolean>: Flag determining whether the button this component represents is selected.
 * 
 * - setState<Function>: Function for toggling the selected state this component represents.
 *      Syntax: setState(<Boolean>)
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SelectItem({children, state, setState, style}) {
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    //Button styles
    let Item = styled("div")({...{
        backgroundColor: "#FFFFFF",
        border: "1px solid",
<<<<<<< HEAD
        borderColor: selected ? "#D6BBFB" : "#D0D5DD",
        color: selected ? "#6941C6" : "#475467",
        outline : selected ? "5px solid #9E77ED3D" : 0,
        padding: "10px",
        borderRadius: "4px",
        textAlign: "center",
        fontSize: "12px",
=======
        borderColor: state ? "#D6BBFB" : "#D0D5DD",
        color: state ? "#6941C6" : "#475467",
        outline : state ? "5px solid #9E77ED3D" : 0,
        padding: "10px",
        borderRadius: "4px",
        textAlign: "center",
        fontSize: "13px",
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        fontFamily: "Inter, sans-serif",
        "&:hover": {
            cursor: "pointer"
        }
    }, ...style});

    return (
<<<<<<< HEAD
        <Item onClick={handleClick}>{children}</Item>
=======
        <Item onClick={() => setState(!state)}>{children}</Item>
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    );
};

//Control panel settings for storybook 
SelectItem.propTypes = {
<<<<<<< HEAD
    children: PropTypes.string
=======
    //SelectItem text
    children: PropTypes.string,

    //SelectItem state
    state: PropTypes.bool,

    //SelectItem setState function
    setState: PropTypes.func
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
};

//Default values for this component
SelectItem.defaultProps = {
<<<<<<< HEAD
=======
    state: false,
    setState: () => {},
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    children: 'Label',
    style: {}
};