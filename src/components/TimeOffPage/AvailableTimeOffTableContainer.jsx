import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvailableTimeOffTable from './AvailableTimeOffTable';

/**
 * This function is used to fetch data from the backend to front end for the different type of timeoff 
 * of an employee and display thenm to the frontend. For explaination, using axios to fetch data from the route
 * and display (type, availableDays and hoursUsed) to the frontend
 */
function AvailableTimeOffTableContainer(){
    const [policies, setPolicies] = useState([]);

    useEffect(() =>{
        axios.get('/timeoff/:id') // get the time off policy data for that particular employee
        .then(response => {
            const data = response.data.map(policy => ({
                type: policy.type,
                availableDays: policy.availableDays,
                hoursUsed: policy.hoursUsed
            }));
            setPolicies(data);
        })
        .catch(error => {
            console.log('Error fetching time off policy data: ', error);
        });
    }, []);
}

export default AvailableTimeOffTableContainer;