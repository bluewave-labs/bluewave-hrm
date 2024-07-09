import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';
import { useState } from 'react';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Selectable component for dropdown menus.
 * 
 * Props:
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
        <Item onClick={handleClick}>
            {children}
            {selected && <CheckIcon sx={{color: colors.purple}} />}
        </Item>
    );
};

//Control panel settings for storybook
MenuItem.propTypes = {
    //MenuItem text
    children: PropTypes.string
};

//Default values for this component
MenuItem.defaultProps = {
    style: {}
};