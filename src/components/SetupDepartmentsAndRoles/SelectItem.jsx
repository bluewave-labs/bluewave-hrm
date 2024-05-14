import {styled} from '@mui/system';
import {useState} from 'react';
import PropTypes from 'prop-types';

export default function SelectItem({label}) {
    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

    let Item = styled("div")({
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
    });

    return (
        <Item onClick={handleClick}>{label}</Item>
    );
};

SelectItem.propTypes = {
    label: PropTypes.string
};

SelectItem.defaultProps = {
    label: 'Label'
};