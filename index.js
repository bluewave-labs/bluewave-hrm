const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const Employee = require('./models/employee');
const TimeOffType = require('./models/timeofftype');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/employee/:empID', async (req, res) => {
    try {
        const empID = req.params.empID;
        const employee = await Employee.findOne({ where: { empID } });
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/timeoff-types', async (req, res) => {
    try {
        const timeOffTypes = await TimeOffType.findAll();
        res.json(timeOffTypes);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.post('/request-timeoff', async (req, res) => {
    try {
        const { empID, timeoffType, numberOfDays } = req.body;
        const employee = await Employee.findOne({ where: { empID } });
        if (employee) {
            if (
                (timeoffType === 'vacation' && numberOfDays <= employee.vacation) ||
                (timeoffType === 'sick' && numberOfDays <= employee.sick) ||
                (timeoffType === 'beaverment' && numberOfDays <= employee.beaverment)
            ) {
                // Optionally, save the time off request here.
                res.status(200).send('Request approved');
            } else {
                res.status(400).send('Request denied: Insufficient leave balance');
            }
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static('public'));

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

db.sequelize.sync({ force: true }).then(async () => {
    console.log('Database synchronized');
    
    // Insert initial data into TimeOffType
    await TimeOffType.bulkCreate([
        { name: 'Sick' },
        { name: 'Vacation' },
        { name: 'Bereavement' }
    ]);
});

db.sequelize.sync({ force: true }).then(async () => {
    let data = require("./constants/data");
    await data.populateTables(db);
    console.log("Sync operation successful.");
    });