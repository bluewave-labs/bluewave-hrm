import Box from '@mui/system/Box';
import PropTypes from 'prop-types';
import './LabelB.css';

export default function LabelB({type, label}) {
    return (
        <Box
            className="labelB"
        >
            {type == "seen" && <span className="dot seen"></span>}
            {type == "waiting" && <span className="dot waiting"></span>}
            {type == "new" && <span className="dot new"></span>}
            {label}
        </Box>
    )
};

LabelB.propTypes = {
    //Label type
    type: PropTypes.oneOf(['seen', 'waiting', 'new']),

    //Label text
    label: PropTypes.string.isRequired
};

//Default values for this component in storybook
LabelB.defaultProps = {
    type: 'seen',
    label: 'Seen'
};