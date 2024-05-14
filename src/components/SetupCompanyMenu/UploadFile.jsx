import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
//import PropTypes from 'prop-types';

export default function UploadFile() {
    return (
        <Box sx={{
            width: "fit-content",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            padding: 3,
            fontFamily: "Inter, sans-serif",
        }}
        >
            <Stack 
                spacing={1} 
                justifyContent="center" 
                textAlign="center"
            >
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