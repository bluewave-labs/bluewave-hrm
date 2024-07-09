import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { fonts } from '../../Styles';

/**
 * Header component for displaying the current user's information.
 * 
 * Props:
 * - user<Object>: Object containing the user's information including avatar, name and role.
 *      Syntax: {avatar: <image source>, name: <string>, role: <string>}
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UserDropdown({user, style}) {
    return (
        <Stack direction="row" spacing={2} sx={{...{
            alignItems: "center",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Avatar alt={user.name} src={user.image} />
            <Stack spacing={1} sx={{
                textAlign: "center"
            }}>
                <b>{user.name}</b>
                <p>{user.role}</p>
            </Stack>
            <KeyboardArrowDownIcon />
        </Stack>
    );
};

//Control panel settings for storybook
UserDropdown.propTypes = {};

//Default values for this component
UserDropdown.defaultProps = {};