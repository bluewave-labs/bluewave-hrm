import Box from '@mui/system/Box';
import PropTypes from 'prop-types';
import './LabelA.css';

export default function LabelA({mode, label}) {
    return (
        <Box
            className={["labelA", `label-${mode}`].join(" ")}
        >
            {label}
        </Box>
    );
};

LabelA.propTypes = {
    //Label type
    mode: PropTypes.oneOf(['orange', 'gray', 'brand', 'success']),

    //Label text
    label: PropTypes.string.isRequired
};

//Default values for this component in storybook
LabelA.defaultProps = {
    mode: 'orange',
    label: 'label'
};