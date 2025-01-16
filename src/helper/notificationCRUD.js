const { produce } = require("immer");
const db = require("../../models");

/**
 * This function creates a nofitication object
 * @param {object} param0 the properties include subject, message, empId, timeOffHistoryId
 * and recipientId which is an array of primary keys of employee objects.
 */

async function createNotification({
  subject,
  message,
  empId,
  timeOffHistoryId,
  recipientId,
}) {
  const data = {
    subject,
    message,
    empId,
    timeOffHistoryId,
    recipientId,
  };
  try {
    // Create notification object
    const notification = await db.notification.create(data);
    const employees = [];
    for (let empId of recipientId) {
      const emp = await db.employee.findByPk(empId);
      employees.push(emp);
    }
    notification.addEmployee(employees);
    return notification;
  } catch (err) {
    console.log("Encountered error when tried to create a new notification");
    throw err;
  }
}

/**
 * Utility function to format notification
 * @param {*} notification object
 */
async function formatNotificationData(notification) {
  // Get role details if employee exists and it has roleId
  const role = notification.employee
    ? await db.role.findByPk(notification.employee.roleId)
    : "Unknown";
  // Get time-off object and employee-annual-time-off object
  let timeOff = null;
  let employeeAnnualTimeOff = null;
  if (notification.timeOffHistory) {
    timeOff = await db.timeOff.findByPk(notification.timeOffHistory.timeOffId);
    notification.timeOff = timeOff;
    employeeAnnualTimeOff = await db.employeeAnnualTimeOff.findOne({
      where: {
        employeeEmpId: notification.timeOffHistory.empId,
        timeOffId: notification.timeOffHistory.timeOffId,
      },
    });
  }

  const recipients = [];
  if (notification.employees) {
    // Get employee id, first name and last name of the recipient
    if (notification.employee && notification.employee.photo) {
      notification.employee.photo =
        notification.employee.photo.toString("base64");
    }
    for (let emp of notification.employees) {
      let notificationStatus = await db.notificationRecipient.findOne({
        attributes: ["status"],
        where: {
          employeeEmpId: emp.empId,
          notificationId: notification.id,
        },
      });
      notificationStatus = notificationStatus.toJSON().status;
      const detail = {
        empId: emp.empId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        notificationStatus,
      };
      recipients.push(detail);
    }
  }

  const data = produce(notification.toJSON(), (updatedNotification) => {
    if (updatedNotification.employee) {
      updatedNotification.employee["role"] = role ? role.toJSON() : null;
    }
    updatedNotification["timeOff"] = timeOff ? timeOff.toJSON() : null;
    updatedNotification["employeeAnnualTimeOff"] = employeeAnnualTimeOff
      ? employeeAnnualTimeOff.toJSON()
      : null;
    updatedNotification["recipients"] = recipients;
    delete updatedNotification.employees;
  });

  return data;
}

/**
 * This function retrives a notification object from the database
 * @param {number} notificationId id of the notification to be retrieved
 * @returns notification object.
 */
async function retrieveNotification(notificationId) {
  try {
    const notification = await db.notification.findOne({
      include: [
        "employee", // new employee or employee that creates a time of request
        "employees", // notification recipients
        "timeOffHistory",
      ],
      where: { id: notificationId },
    });
    if (!notification) {
      return null;
    }
    return await formatNotificationData(notification);
  } catch (error) {
    console.log("Encountered error when tried to retrieve notification");
    throw error;
  }
}

/**
 * This function retrives all notification objects from the database
 * @returns an array of notification objects.
 */
async function retrieveAllNotifications() {
  try {
    const notifications = await db.notification.findAll({
      include: [
        "employee", // new employee or employee that creates a time of request
        "employees", // notification recipients
        "timeOffHistory",
      ],
    });
    if (notifications.length === 0) {
      return null;
    }
    const formattedData = [];
    for (let n of notifications) {
      const data = await formatNotificationData(n);
      formattedData.push(data);
    }
    return formattedData;
  } catch (error) {
    console.log("Encountered error when tried to retrieve notification");
    throw error;
  }
}

/**
 * This function retrieves notifications sent to a given employee
 * @param {number} recipientId empId of an employee
 * @returns array of notification objects
 */
async function retrieveNotificationByRecipient(recipientId) {
  // Get the notification ids for the given recipientId
  let notificationIds = await db.notificationRecipient.findAll({
    attributes: ["notificationId"],
    where: { employeeEmpId: recipientId },
  });

  if (notificationIds.length === 0) {
    return null;
  }

  const ids = [];
  // Extract the ids
  for (let n of notificationIds) {
    ids.push(n.toJSON().notificationId);
  }

  const notifications = await db.notification.findAll({
    include: [
      "employee", // new employee or employee that creates a time of request
      "employees", // notification recipients
      "timeOffHistory",
    ],
    where: { id: { [db.Sequelize.Op.in]: ids } },
    order: [["id", "DESC"]],
  });
  const formattedData = [];
  for (let n of notifications) {
    const data = await formatNotificationData(n);
    formattedData.push(data);
  }
  return formattedData;
}

/**
 *
 * @param {number} notificationId
 * @param {number} employeeEmpId
 * @param {string} newStatus the value should be in new, seen, waiting
 */
async function updateNotificationStatus(
  notificationId,
  employeeEmpId,
  newStatus
) {
  try {
    return await db.notificationRecipient.update(
      { status: newStatus },
      {
        where: {
          employeeEmpId: employeeEmpId,
          notificationId: notificationId,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred");
    throw error;
  }
}
/**
 * This function delete a notification
 * @param {number} notificationId id of the notification to be deleted
 */
async function deleteNotification(notificationId) {
  const data = await db.notification.destroy({
    where: {
      id: notificationId,
    },
  });

  await db.notificationRecipient.destroy({
    where: {
      notificationId: notificationId,
    },
  });
  return data;
}
module.exports = {
  createNotification,
  retrieveNotification,
  retrieveAllNotifications,
  retrieveNotificationByRecipient,
  updateNotificationStatus,
  deleteNotification,
};
