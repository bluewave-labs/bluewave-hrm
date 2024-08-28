import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
<<<<<<< HEAD
=======
import { useState, createRef } from 'react';
import { colors, fonts } from '../../Styles';
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea

/**
 * Intermediate component for uploading an image in the SetupCompanyMenu component
 * 
 * Props:
<<<<<<< HEAD
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
=======
 * - setFile<Function>: Function for setting the file to be uploaded in the parent component.
 *      Syntax: setFile(<file base64 string>)
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function UploadFile({setFile, style}) {
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = createRef();

    function handleFileChange(e) {
        //console.log("Running handleFileChange()")
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            setFile(reader.result);
        })

        reader.readAsDataURL(e.target.files[0]);
    };

    function handleDragOver(e) {
        e.preventDefault();
        setDragOver(true);
    };

    function handleDragLeave() {
        setDragOver(false);
    };

    
    function handleDrop(e) {
        e.preventDefault();
        //console.log("Running handleDrop()")
        setDragOver(false);
        const f = e.dataTransfer.files;
        if (f.length > 0) {
            fileInputRef.current.files = f;
            //console.log(f);
            handleFileChange({target: {files: f}});
        }
    };

    function handleClick() {
        //console.log("Running handleClick()");
        fileInputRef.current.click();
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{...{
                width: "fit-content",
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
                padding: "16px 24px",
                color: colors.darkGrey,
                fontFamily: fonts.fontFamily
            }, ...style}}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
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
<<<<<<< HEAD
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
=======
                <input 
                    type="file"
                    ref={fileInputRef}
                    accept=".svg, .png, .jpg, .jpeg, .gif"
                    onChange={handleFileChange}
                    style={{display: "none"}}
                />
                {/*Text*/}
                <p>
                    <a 
                        id="uploadFileLink"
                        onMouseOver={() => document.getElementById("uploadFileLink").style.cursor="pointer"}
                        onMouseOut={() => document.getElementById("uploadFileLink").style.cursor="auto"}
                        onClick={handleClick}
                        style={{
                            color: "#7F56D9", 
                            textDecoration: "none", 
                            fontWeight: "bold",
                            
                        }}
                    >
                        Click to upload
                    </a> 
                    &nbsp;or drag and drop
                </p>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </Stack>
        </div>
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    );
};

//Control panel settings for storybook 
UploadFile.propTypes = {};

//Default values for this component
UploadFile.defaultProps = {
    style: {}
};