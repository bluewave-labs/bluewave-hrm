import Box from '@mui/system/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import BoardTabContent from './BoardTabContent';
import HistoryTabContent from './HistoryTabContent';
import TeamTabContent from './TeamTabContent';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';
import { colors, fonts } from '../../Styles';
import axios from 'axios';
import StateContext from '../../StateContext';

const policies2 = [
    {
        type: 'Vacation',
        availableDays: '15 days (180 hours)',
        hoursUsed: '23 hours used'
    },
    {
        type: 'Sick',
        availableDays: '180 hours left',
        hoursUsed: '23 hours used'
    },
    {
        type: 'Bereavement',
        availableDays: '-',
        hoursUsed: '23 hours used'
    }
];

const timeOffPeriods2 = [
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    }
];

const uTimeOff2 = 
[
    {
        "id": 1,
        "startDate": "2024-09-02T18:25:06.783Z",
        "endDate": "2024-09-05T18:25:06.783Z",
        "hours": 22.5,
        "note": "nd donec pretium. Dictum varius duis at consectetur lorem. Eget nulla facilisi etiam dignissim diam quis enim. Mauris pellent",
        "empId": 1,
        "approvalAuthorityId": null,
        "timeOffId": 1,
        "requestDate": "2013-08-28T18:25:06.783Z",
        "decisionDate": "2013-08-31T18:25:06.783Z",
        "status": "Approved",
        "createdAt": "2024-07-26T22:27:17.862Z",
        "updatedAt": "2024-07-26T22:27:17.862Z"
    }
];
export default function TimeOffMenu({ style }) {
    const [tab, setTab] = useState('Board'); // State determining which tab is selected
    const [policies, setPolicies] = useState(policies2);
    const [timeOffPeriods, setTimeOffPeriods] = useState(timeOffPeriods2);
    const [uTimeOff,setUtimeOff] = useState(uTimeOff2);
    const stateContext = useContext(StateContext)
    //console.log("I am here please help me!!!");
    // Function for selecting a new tab
    const handleChange = (e, newValue) => {
        setTab(newValue);
    };

    // Custom style elements
    const StyledTab = styled(Tab)({
        textTransform: "none",
    });

    const StyledTabPanel = styled(TabPanel)({
        padding: 0
    });
    /***
     * Get the time off periods for the login employees
     * timeOffperiods<<Aray>>: object contains
     *  {
        user: {
            avatar: AvatarImage,
            name:
            role:
        },
        from:
        to: 
        type: 
        amount: 
        note:
        status:
    }
     */
    useEffect(() => {
        const empId = stateContext.state.employee?stateContext.state.employee.empId:-1;
        //console.log(stateContext.state.employee);
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/api/timeoffemployeehistory/${empId}`); 
                setTimeOffPeriods(res.data);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    /***
     * Get the policies from the backend
     * policies <<Array>>: Object contains
     * {
        type:
        availableDays: 
        hoursUsed:
    }
     */
    useEffect(()=>{
        const empId = stateContext.state.employee? stateContext.state.employee.empId:-1;

        const fetchData = async () =>{
            try{
                const res = await axios.post(`http://localhost:5000/api/timeOffPolicies/${empId}`);
                setPolicies(res.data);
            } catch(err){
                console.log(err)
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount
    /**
         * Get the upcoming time off periods    @GabrielChan1 if you think you need this you can use this api call will only give you the upcoming time offs
         *  uTimeOff <<Array>>: Object Conatains
         * {
                "id":
                "startDate":
                "endDate": 
                "hours": 
                "note":
                "empId":
                "approvalAuthorityId": 
                "timeOffId": 
                "requestDate": 
                "decisionDate": 
                "status": 
                "createdAt": 
                "updatedAt": 
            }
         */
            // useEffect(()=>{
            //     const empId = stateContext.state.employee? stateContext.state.employee.empId:-1;
        
            //     const fetchData = async () =>{
            //         try{
            //             const res = await axios.get(`http://localhost:5000/api/utimeoffhistories/${empId}`);
            //             setUtimeOff(res.data);
            //         } catch(err){
            //             console.log(err)
            //         }
            //     };
            //     fetchData();
            // }, []); // Empty dependency array ensures this runs once on mount


    return (
        <Box sx={{
            boxSizing: "border-box",
            minWidth: "980px",
            paddingX: "45px",
            paddingY: "42px",
            border: "1px solid #EBEBEB",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            ...style
        }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "#EAECF0" }}>
                    <TabList
                        textColor="secondary"
                        indicatorColor="secondary"
                        onChange={handleChange}
                    >
                        <StyledTab label="Board" value="Board" />
                        <StyledTab label="History" value="History" />
                        <StyledTab label="My team" value="My team" />
                    </TabList>
                </Box>
                <StyledTabPanel value="Board">
                    <BoardTabContent policies={policies} timeOffPeriods={timeOffPeriods} />
                </StyledTabPanel>
                <StyledTabPanel value="History">
                    <HistoryTabContent timeOffPeriods={timeOffPeriods} />
                </StyledTabPanel>
                <StyledTabPanel value="My team">
                    <TeamTabContent timeOffPeriods={timeOffPeriods} />
                </StyledTabPanel>
            </TabContext>
        </Box>
    );
}

// Control panel settings for storybook
TimeOffMenu.propTypes = {};

// Default values for this component
TimeOffMenu.defaultProps = {
    style: {}
};
