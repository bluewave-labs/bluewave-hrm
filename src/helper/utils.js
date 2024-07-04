/**
 * This modules contains utility functions */

/**
 * This function helps to find hierarchical structure from a given employee to the top of management level.
 * @param {} db database containing the data
 * @param {*} empId employee id
 * @returns an object of hierarchical structure empId and level of priority
 */
const getReportTo = async (db, empId) => {
  const results = [];
  let priority = 1;
  let managerId = null;
  while (true) {
    const employee = await db.employee.findByPk(empId);
    if (employee === null) {
      break;
    }
    const data = {};
    if (!employee.managerId) {
      // current employee has no manager
      if (results.length === 0) {
        // employee is the chief executive
        data.managerId = null;
        data.priority = null;
        results.push(data);
      }
      break;
    }
    data.managerId = employee.managerId;
    data.priority = priority;
    results.push(data);
    empId = employee.managerId;
    managerId = employee.managerId;
    priority++;
  }
  return results;
};

/**
 * This function creates an object that enables a case insensitive search on a specified column.
 * @param {*} db database containing the data
 * @param {*} colName column to be searched
 * @param {*} item item to search for
 * @returns sequelize object
 */
const getComparator = (db, colName, item) => {
  return db.sequelize.where(
    db.Sequelize.fn("lower", db.Sequelize.col(colName)),
    item.toLowerCase()
  );
};
/**
 * This function gets the name of the manager of an employee
 * @param {*} db database containing the data
 * @param {Number} managerId employee id number the manager
 * @returns Manager's name of an employee or null
 */
const getManagerName = async (db, managerId) => {
  const manager = await db.employee.findByPk(managerId);
  if (manager) {
    return `${manager.firstName} ${manager.lastName}`;
  }
  //manager does not exist - return null
  return null;
};

module.exports = { getReportTo, getComparator, getManagerName };
