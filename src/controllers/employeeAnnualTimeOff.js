const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { attribute } = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");

exports.showAll = async (req, res) => {
  const data = await db.employeeAnnualTimeOff.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
   //include: ["timeOff"]
  });
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  const empId = req.params.empid;
try {
  const query = `SELECT e.id, e."yearNumber" AS "year", e."hoursAllowed", e."cumulativeHoursTaken" AS "hoursUsed",(e."hoursAllowed" - e."cumulativeHoursTaken") AS "hoursLeft", t."id" AS "timeOffId", t.category FROM "employeeAnnualTimeOff" e JOIN "timeOff" t ON e."timeOffId" = t.id  WHERE e."employeeEmpId" = :empId ORDER BY 2;`;
const [results, metadata] = await db.sequelize.query(query, {
  replacements: { empId: empId },
});
     res.status(200).send(results);

} catch (err) {
  console.log(err);
  res.status(400).send("Not found!");

}



  // const data = await db.employeeAnnualTimeOff.findAll({
  //   where: { employeeEmpId: empId },
  // });
  // if (data) {
  //   res.status(200).send(data);
  // } else {
  //   res.status(400).send("Not found!");
  // }
};

exports.createRecord = async (req, res) => {
  try {
    const data = await db.employeeAnnualTimeOff.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.employeeAnnualTimeOff.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.employeeAnnualTimeOff.destroy({
      where: { id: id },
    });
    if (count == 1) {
      res.send({
        message: message.deleted,
      });
    } else {
      res.send({
        message: message.failed,
      });
    }
  } catch (err) {
    res.send({
      message: err.message || message.failed,
    });
  }
};

/**
 * {
        type:
        availableDays: 
        hoursUsed:
    }
 * @param {empId} req 
 * @param {timeOffPolicies} res 
 */
    exports.timeOffPolicies = async (req, res) => {
      const empId = req.params.empId;
      try {
        const query = `
          SELECT 
            e.id, 
            e."yearNumber" AS "year", 
            e."hoursAllowed", 
            e."cumulativeHoursTaken" AS "hoursUsed",
            (e."hoursAllowed" - e."cumulativeHoursTaken") AS "hoursLeft", 
            t."id" AS "timeOffId", 
            t.category 
          FROM 
            "employeeAnnualTimeOff" e 
          JOIN 
            "timeOff" t 
          ON 
            e."timeOffId" = t.id  
          WHERE 
            e."employeeEmpId" = :empId 
          ORDER BY 2;
        `;
        
        const [results, metadata] = await db.sequelize.query(query, {
          replacements: { empId: empId },
        });
    
        const policies = [];
        const now = new Date();
        const year = now.getFullYear();
    
        for (const result of results) {
          if (result.year === year) {
            const policy = {
              type: result.category,
              availableDays: Math.floor(result.hoursLeft / 8),
              hoursUsed: result.hoursUsed,
            };
            
            policies.push(policy);
          }
        }
    
        res.status(200).send(policies);
    
      } catch (err) {
        console.log(err);
        res.status(400).send("Not found!");
      }
    };
