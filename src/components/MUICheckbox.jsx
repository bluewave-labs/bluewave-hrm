import Checkbox from '@mui/material/Checkbox';
import {styled} from '@mui/system';
import PropTypes from 'prop-types';

export default function MUICheckbox({id, value, size, enabled, indeterminate}) {
    const StyledCheckbox = styled(Checkbox)({
        color: "#D0D5DD",
        "&.Mui-checked, &.MuiCheckbox-indeterminate": {
            color: "#7F56D9"
        }
    });

    return (
        <StyledCheckbox 
            id={id} 
            value={value} 
            size={size} 
            disabled={!enabled} 
            indeterminate={indeterminate}  
        />
    )
};

MUICheckbox.propTypes = {
    size: PropTypes.oneOf(['small', 'medium']),
    enabled: PropTypes.bool,
    indeterminate: PropTypes.bool
};

MUICheckbox.defaultProps = {
    id: 'test',
    value: 'value',
    size: 'medium',
    enabled: true,
    indeterminate: false
};