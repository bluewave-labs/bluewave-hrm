import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

/**
 * Intermediate component for uploading an image in the SetupCompanyMenu component
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function UploadFile({style}) {
    return (
        <Box sx={{...{
            width: "fit-content",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            padding: 3,
            fontFamily: "Inter, sans-serif"
        },...style}}
        >
            <Stack 
                spacing={1} 
                justifyContent="center" 
                textAlign="center"
            >
                {/*Upload icon*/}
                <Box 
                    sx={{
                        width: "fit-content",    
                        border: "1px solid #EBEBEB",
                        borderRadius: 2,
                        padding: 1,
                        "&.MuiBox-root": {
                            margin: "0 auto"
                        }
                    }}
                >
                    <CloudUploadOutlinedIcon />
                </Box>
                {/*Text*/}
                <p>
                    <a 
                        href="#" 
                        style={{
                            color: "#7F56D9", 
                            textDecoration: "none", 
                            fontWeight: "bold"}}
                    >
                        Click to upload
                    </a> 
                    or drag and drop
                </p>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook 
UploadFile.propTypes = {};

//Default values for this component in storybook
UploadFile.defaultProps = {
    style: {}
};