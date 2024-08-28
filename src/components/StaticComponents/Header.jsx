import Box from '@mui/system/Box';
import UserDropdown from './UserDropdown';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

/**
 * Header component for most pages. Contains the company logo and the current user's information.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function Header({style}) {
    const user = {
        avatar: AvatarImage,
        name: "Gabriel Chan",
        role: "Administrator"
    };

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            width: "100%",
            height: "87px",
            padding: "20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #EBEBEB",
            boxShadow: "0 10px 6px #10182808",
            position: "fixed",
            zIndex: 1
        }, ...style}}>
            
            <UserDropdown user={user} />
        </Box>
    );
};

//Control panel settings for storybook
Header.propTypes = {};

//Default values for this component
Header.defaultProps = {
    style: {}
};
