import React, { useEffect,useState } from 'react'
import { Typography,Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

const rows = [
  {title:"Department change",from:"Marketing",to:"Management",date:"Mar 29, 2024"},
  {title:"Employment type change",from:"Contractor",to:"Permanent",date:"Mar 29, 2024"},
  {title:"Position change",from:"CEO",to:"CTO",date:"Mar 29, 2024"}
  
]




const MyinfoJourney = () => {

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
    return date.toLocaleDateString('en-US', options);
}

  const [journeyLists,setJourneyLists] = useState([])

  useEffect(()=>{
    const getJourneyAPI = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/changehistories",{
          method:'GET',
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        const result = await res.json();
        setJourneyLists(result)
       


      }
      catch(error) {
        console.log("Error fetching Myinfo:Journey",error)
      }
    }
    getJourneyAPI()
  
  },[])

  return (
   <>
     <TableContainer >
      <Table sx={{ width:"1012px" }} aria-label="simple table">
        <TableBody>
          {journeyLists.map((list) => (
            <TableRow
              key={list.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{fontSize:'13px',fontWeight:'600',color:'#344054',fontFamily:'Inter'}} >
                {list.changeType}
              </TableCell>
              <TableCell align="left" >
                <Stack direction="row" spacing={2}>
                  <Typography sx={{fontSize:'13px',fontWeight:'regular',color:'#344054',fontFamily:'Inter'}}>From:
                    <Typography display="inline" sx={{fontSize:'13px',fontWeight:'bold',color:'#344054',fontFamily:'Inter',marginLeft:"3px"}}>{list.changeFrom}</Typography>
                  </Typography>
                  <Typography sx={{fontSize:'13px',fontWeight:'regular',color:'#344054',fontFamily:'Inter'}}>To:
                    <Typography display="inline" sx={{fontSize:'13px',fontWeight:'bold',color:'#344054',fontFamily:'Inter',marginLeft:"3px"}}>{list.changeTo}</Typography>
                  </Typography>
                </Stack>
                </TableCell>
              <TableCell  align="right" sx={{fontSize:'13px',fontWeight:'regular',color:'#344054',fontFamily:'Inter'}}>{formatDate(list.date)}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  )
}

export default MyinfoJourney

