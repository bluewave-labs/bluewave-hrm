import {styled} from '@mui/system';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function MUIButton({mode, label, enabled}) {
    const primaryStyle = {
        backgroundColor: "#7F56D9",
        "&:hover": {
            backgroundColor: "#6941C6"
        }
    };

    const secondaryAStyle = {
        color: "#6941C6",
        borderColor: "#D6BBFB",
        "&:hover": {
            borderColor: "#D6BBFB",
            backgroundColor: "#F9F5FF"
        }
    }

    const secondaryBStyle = {
        color: "#475467",
        borderColor: "#D0D5DD",
        "&:hover": {
            borderColor: "#D0D5DD",
            backgroundColor: "#F9FAFB"
        }
    };

    const tertiaryStyle = {
        color: "#475467"
    };

    const errorStyle = {
        backgroundColor: "#D92D20",
        "&:hover": {
            borderColor: "#912018",
            backgroundColor: "#B42318"
        }
    };

    let StyledButton;
    switch (mode) {
        case "primary": 
            StyledButton = styled(Button)(primaryStyle);
            break;
        case "secondaryA":
            StyledButton = styled(Button)(secondaryAStyle);
            break;
        case "secondaryB":
            StyledButton = styled(Button)(secondaryBStyle);
            break;
        case "error":
            StyledButton = styled(Button)(errorStyle);
            break;
        default:
            StyledButton = styled(Button)(tertiaryStyle);
    }

    if (mode === "primary" || mode === "error") {
        return (
            <StyledButton variant="contained" disabled={!enabled}>{label}</StyledButton>
        );
    }
    else if (mode === "secondaryA" || mode === "secondaryB") {
        return (
            <StyledButton variant="outlined" disabled={!enabled}>{label}</StyledButton>
        );
    }
    else {
        return (
            <StyledButton variant="text" disabled={!enabled}>{label}</StyledButton>
        );
    }
};

MUIButton.propTypes = {
    mode: PropTypes.oneOf(['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']),
    label: PropTypes.string,
    enabled: PropTypes.bool
};

MUIButton.defaultProps = {
    mode: 'primary',
    label: 'Button',
    enabled: true
};