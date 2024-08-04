import Box from '@mui/system/Box';
import Header from '../StaticComponents/Header';
import SideMenu from '../StaticComponents/SideMenu';
import { colors, fonts } from '../../assets/Styles';

/**
 * Page template for most HRM application pages. Includes the Header and SideMenu components.
 * 
 * Props:
 * - children<Any>: Main content for this page.
 * 
 * - style<Object>: Optional prop for adding further inline styling in the outer component.
 *      Default: {}
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function Page({children, style, innerStyle,}) {
    return (
        <Box sx={{...{
            width: "100%", 
            height: "100%", 
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Header*/}
            <Header />
            {/*Side menu*/}
            <SideMenu />
            <Box sx={{...{
                boxSizing: "border-box",
                paddingLeft: "370px",
                paddingRight: "75px", 
                paddingTop: "127px",
                paddingBottom: "40px", 
                backgroundColor: "#F9FAFB",
                width: "100%",
                height: "100%",
            }, ...innerStyle}}>
                {/*Main page content*/}
                {children}
                
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
Page.propTypes = {};

//Default values for this component
Page.defaultValues = {
    style: {},
    innerStyle: {}
};