import Stack from '@mui/system/Stack';
import Page from '../StaticComponents/Page';
import UpdatesMenu from './UpdatesMenu';

/**
 * Home page of the HRM application. Contains the updates menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function UpdatesPage({style, innerStyle}) {
    return (
        <Page style={style} innerStyle={innerStyle}>
            <Stack 
                direction="row" 
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "40px",
                    minWidth: "1042px"
                }}
            >
                <h3>Hello, Gabriel</h3>
                <p>Today is Monday, June 6, 2024</p>
            </Stack>
            <UpdatesMenu />
        </Page>
    );
};

//Control panel settings for storybook
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {},
    innerStyle: {}
};