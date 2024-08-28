import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';
<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Selectable component for dropdown menus.
 * 
 * Props:
<<<<<<< HEAD
 * - children<Any>: Text to be used for the button label
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function MenuItem ({children, style}) {
    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

    let Item = styled("div")({...{
        fontFamily: fonts.fontFamily,
        backgroundColor: selected ? "#F9FAFB" : "#FFFFFF",
=======
 * - children<Any>: Text to be used for the button label.
 * 
 * - state<Boolean>: Flag determining whether the button this component represents is selected.
 * 
 * - setState<Function>: Function for toggling the selected state this component represents.
 *      Syntax: setState(<Boolean>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function MenuItem({children, state, setState, style}) {

    let Item = styled("div")({...{
        fontFamily: fonts.fontFamily,
        backgroundColor: state ? "#F9FAFB" : "#FFFFFF",
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        border: "1px solid #FFFFFF",
        borderRadius: "4px",
        width: "100%",
        minWidth: "200px",
        minHeight: "36px",
        padding: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
            cursor: "pointer",
            border: "1px solid #D0D5DD"
        }
    }, ...style});

    return (
<<<<<<< HEAD
        <Item onClick={handleClick}>
            {children}
            {selected && <CheckIcon sx={{color: colors.purple}} />}
=======
        <Item onClick={() => setState(!state)}>
            {children}
            {state && <CheckIcon sx={{color: colors.purple}} />}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        </Item>
    );
};

//Control panel settings for storybook
MenuItem.propTypes = {
    //MenuItem text
<<<<<<< HEAD
    children: PropTypes.string
=======
    children: PropTypes.string,

    //MenuItem state
    state: PropTypes.bool,

    //MenuItem setState function
    setState: PropTypes.func
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
};

//Default values for this component
MenuItem.defaultProps = {
    style: {}
};