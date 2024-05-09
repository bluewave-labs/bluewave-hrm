//import {ThemeProvider, createTheme} from '@mui/system';
//import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import './HRMButton.css';

/**
 * Button components for both HRM and Onboarding applications. Can be configured to be a primary,
 * secondary, tertiary or error button using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the button. 
 *      Valid values: ['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']
 * 
 * - label<String>: Text to be used for the button label.
 * 
 * - enabled<Boolean>: Flag determining whether the button is enabled or disabled.
 */
export default function HRMButton({mode, label, enabled}) {
    /*
    const theme = createTheme({
        palette: {
            primary: {
                border: "#7F56D9",
                bg: "#7F56D9",
                bgHover: "#6941C6",
                outline: "#9E77ED3D"
            },
            secondaryA: {
                border: "#D6BBFB",
                bg: "#FFFFFF",
                bgHover: "#F9F5FF",
                text: "#6941C6",
                textHover: "#53389E",
                outline: "#9E77ED3D"
            },
            secondaryB: {
                border: "#D0D5DD",
                bg: "#FFFFFF",
                bgHover: "#F9FAFB",
                text: "#344054",
                textHover: "#182230",
                outline: "#98A2B324"
            },
            tertiary: {
                text: "#475467"
            },
            error: {
                border: "#D92D20",
                borderHover: "#912018",
                bg: "#D92D20",
                bgHover: "#B42318",
                bgActive: "#B42318",
                outline: "#FCCED7"
            }
        }
    })

    const primaryStyle = {
        borderRadius: 4,
        borderColor: "primary.border",
        bgcolor: "primary.bg",
        "&:hover": {
            cursor: "pointer",
            bgcolor: "primary.bgHover",
        }
    };

    const secondaryAStyle = {
        borderRadius: 4,
        borderColor: "secondaryA.border",
        bgcolor: "secondaryA.bg",
        color: "secondaryA.text",
        "&:hover": {
            bgcolor: "secondaryA.bgHover",
            color: "secondaryA.textHover"
        }
    };

    const secondaryBStyle = {
        borderRadius: 4,
        borderColor: "secondaryB.border",
        bgcolor: "secondaryB.bg",
        color: "secondaryB.color",
        "&:hover": {
            bgcolor: "secondaryB.bgHover",
            color: "secondaryB.textHover"
        }
    }

    const tertiaryStyle = {
        color: "tertiary.text"
    }

    const errorStyle = {
        borderRadius: 4,
        borderColor: "error.border",
        bgcolor: "error.bg",
        "&:hover": {
            borderColor: "error.borderHover",
            bgcolor: "error.bgHover",
        }
    }
    */

    return (
        /*
        <ThemeProvider theme={theme}>
            {mode == "primary" && 
                <Button variant="contained" sx={primaryStyle} disabled={!enabled}>{label}</Button>
            }
        </ThemeProvider>
        */
        <button
            className={["button", `button-${mode}`].join(' ')}
            disabled={!enabled}
        >
            {label}
        </button>
    );
};

//Control panel settings for storybook 
HRMButton.propTypes = {
    //Button type
    mode: PropTypes.oneOf(['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']),

    //Button text
    label: PropTypes.string.isRequired,

    //Button enabled flag
    enabled: PropTypes.bool,

    //Behaviour when clicked
    onClick: PropTypes.func
};

//Default values for this component in storybook
HRMButton.defaultProps = {
    mode: 'primary',
    label: 'Button',
    enabled: true,
    onClick: undefined
};

