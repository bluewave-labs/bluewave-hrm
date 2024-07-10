const fs = require("fs");

const displayInfo = (size, tableName) => {
  console.log(
    `Insert operation successful. ${size} ${
      size > 1 ? "records" : "record"
    } inserted into the ${tableName} table.`
  );
};

const removeKey = (data, key) => {
  data.forEach((element) => {
    delete element[key];
  });
};

module.exports = {
    populateEmployeeTable : async function(db){
        const data = require("./data.json")
        let count = 0;
        for (let i of data){
            await db.Employee.create({
                empID: i.empID,
                superID: i.superID,
                superEmail: i.superEmail,
                sick: i.sick,
                vacation: i.vacation,
                beaverment: i.beaverment,
                type: i.type,
            });
            count++;
        }

        displayInfo(count, "Employee");

    },
    populateTimeOffTable : async function(db){
      const data = require('./timeofftype.json')
      let count = 0;
      for (let i of data){
        await db.TimeOffType.create({
          name: i.name,
        });
        count++;
      }

      displayInfo(count, "TimeOffType");
    },

    populateTables: async function (db) {
        console.log("Populating table...");
        await this.populateEmployeeTable(db);
        await this.populateTimeOffTable(db);
        console.log("Operation successful, tables Populated");
    }
};