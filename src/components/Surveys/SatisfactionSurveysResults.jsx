import { 
    Box, 
    Stack, 
    ThemeProvider, 
    Typography, 
    createTheme, 
    Table,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Link,
    //Card, 
   // CardContent,
} from '@mui/material';
//import { DataGrid } from '@mui/x-data-grid';
import HRMButton from "../Button/HRMButton";
import React, { useEffect, useState } from 'react';
import NoContentComponent from './NoContentComponent';
//import PropTypes from 'prop-types'

const theme = createTheme({
    typography: {
  
      h2: {
        fontWeight: 500,
        fontFamily:'Inter',
        fontSize: '18px',
        color: '#101828',
        //marginTop:'55px',
        //marginBottom:'13px',
      },
     
      body1: {
        fontWeight: 600,
        fontFamily:'Inter',
        fontSize: '18px',
        color: '#101828',
      },
  
      body2: {
        fontWeight: 500,
        fontFamily:'Inter',
        fontSize: '16px',
        color: '#344054',
      },
  
      body3: {
        fontWeight: 400,
        fontFamily:'Inter',
        fontSize: '11px',
        color: '#475467',
      },
      bodybutton: {
        fontWeight: 400,
        fontFamily:'Inter',
        fontSize: '13px',
        color: '#FFF',
      },
     
    },
});

const mockSurveys = [
    { id: 2, name: 'Q2 2024 General', sentDate: 'Jan 20, 2024', endDate: 'Jan 20, 2024', answered:'5'  },
    { id: 3, name: 'Manager Satisfaction Survey', sentDate: 'Jan 20, 2024', endDate: 'Jan 20, 2024', answered:'2' },
    { id: 5, name: 'New Comers Survey', sentDate: 'Jan 20, 2024', endDate: 'Jan 20, 2024', answered:'1' },

];

function SatisfactionSurveysResults(props) {

    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                // const response = await fetch("");
                // const data = await response.json();
                // setSurveys(data);
                setSurveys(mockSurveys);
            } catch (error) {
               console.error("No survey data", error);
            }
        };
        fetchSurveys();

    }, []);

    // const handleView = (id) => {
    //     console.log("Viewing survey with id:", id);
        
    // };

    const handleDelete = (id) => {
        console.log("Deleting survey with id:", id);
       
        setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== id));
    };

    // const columns = [
    //     { field: 'name', headerName: 'Name', width: 250 },
    //     { field: 'sentDate', headerName: 'Start date', width: 150 },
    //     { field: 'endDate', headerName: 'Finish date', width: 150 },
    //     { field: 'answered', headerName: 'Answered', width: 150 },
    //     {
    //         field: "actions",
    //         headerName: "Actions",
    //         width: 200,
    //         renderCell: (params) => (
    //           <>
    //             <HRMButton
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={() => handleDelete(params.row.id)}
    //             >
    //                 Delete
    //             </HRMButton>
    //             <HRMButton
    //               variant="contained"
    //               color="primary"
    //               style={{ marginRight: 10 }}
    //               onClick={() => handleView(params.row.id)}
    //             >
    //               View
    //             </HRMButton>
                
    //     </>
    //   ),
    // },
    // ];

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant='body1'>Surveys</Typography>
                    <HRMButton
                        onClick={()=>{
                            console.log("called");
                            // if(onClickEdit){
                            //   onClickEdit(true);
                            // }
                        }}
                        mode={"primary"}
                        style={{ borderRadius: "8px", width: "158px", height: "34.0px", }}
                    >
                        <Typography variant='bodybutton'>Send new survey</Typography>
                    </HRMButton>
                </Stack>
                <Stack sx={{paddingTop:'16px'}}>
                        {surveys.length === 0 ? (
                            <Box sx={{ padding: "48px" }}>
                            <NoContentComponent>
                            <Typography variant='body2'>There are no surveys sent yet</Typography>
                            <Typography variant='body3'>Try sending a survey by clicking the "Send new survey" button</Typography>

                              
                            </NoContentComponent>
                          </Box>
                        
                        ) : (

                            <Box>
                               
                               <TableContainer >
                                <Table sx={{  }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow sx={{backgroundColor:"#F9FAFB"}}>
                                        <TableCell sx={{fontSize:'12px',fontWeight:'medium',color:'#475467',fontFamily:'Inter'}}>Name</TableCell>
                                        <TableCell sx={{fontSize:'12px',fontWeight:'medium',color:'#475467',fontFamily:'Inter'}}>Start date</TableCell>
                                        <TableCell sx={{fontSize:'12px',fontWeight:'medium',color:'#475467',fontFamily:'Inter'}}>Finish date</TableCell>
                                        <TableCell sx={{fontSize:'12px',fontWeight:'medium',color:'#475467',fontFamily:'Inter'}}>Answered</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mockSurveys.map((survey) => (
                                            <TableRow
                                            key={survey.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" sx={{fontSize:'14px',fontWeight:'medium',color:'#101828',fontFamily:'Inter'}} >
                                                    {survey.name}
                                                </TableCell>
                                                <TableCell sx={{fontSize:'13px',fontWeight:'regular',color:'#475467',fontFamily:'Inter'}}>
                                                    {survey.sentDate}
                                                </TableCell>
                                                <TableCell sx={{fontSize:'13px',fontWeight:'regular',color:'#475467',fontFamily:'Inter'}}>
                                                    {survey.endDate}
                                                </TableCell>
                                                <TableCell sx={{fontSize:'13px',fontWeight:'regular',color:'#475467',fontFamily:'Inter'}}>
                                                    {survey.answered} times
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Stack direction="row" display="flex" justifyContent="right">
                                                    <Link
                                                        component="button"
                                                        underline="none"
                                                        onClick={() => handleDelete(survey.name)}
                                                        sx={{fontSize:'14px',fontWeight:'600',color:'#475467',fontFamily:'Inter',marginBottom:'4px',marginRight:'8px'}}
                                                        >Delete
                                                    </Link>
                                                    </Stack>
                                                </TableCell>
                                            
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Box>
                            // <ul>
                            //     {surveys.map((survey, index) => (
                            //         <li key={index}>{survey.title}</li>
                            //     ))}
                            // </ul>
                        )}
                </Stack>
            </ThemeProvider>
        </Box>
    )
}

SatisfactionSurveysResults.propTypes = {}

export default SatisfactionSurveysResults
