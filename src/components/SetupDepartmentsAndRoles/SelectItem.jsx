import {styled} from '@mui/system';
import {useState} from 'react';
import PropTypes from 'prop-types';

/**
 * Button component for selecting deparmentments and roles in the SetupDepartmentsMenu and 
 * SetupRolesMenu components
 * 
 * Props:
 * - label<String>: Text to be used for the button label.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SelectItem({label, style}) {
    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

    //Button styles
    let Item = styled("div")({...{
        backgroundColor: "#FFFFFF",
        border: "1px solid",
        borderColor: selected ? "#D6BBFB" : "#D0D5DD",
        color: selected ? "#6941C6" : "#475467",
        outline : selected ? "5px solid #9E77ED3D" : 0,
        padding: "10px",
        borderRadius: "4px",
        textAlign: "center",
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
        "&:hover": {
            cursor: "pointer"
        }
    }, ...style});

    return (
        <Item onClick={handleClick}>{label}</Item>
    );
};

//Control panel settings for storybook 
SelectItem.propTypes = {
    label: PropTypes.string
};

//Default values for this component
SelectItem.defaultProps = {
    label: 'Label',
    style: {}
};