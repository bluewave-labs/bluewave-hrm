/**
 * Formats a number phone into a format (123) 456 -7890.
 * @param {string} num string number to be formatted.
 * @returns formatted string.
 */
const formatPhoneNumber = (num) => {
  try {
    const newFormat = [];
    if (num.length === 10) {
      newFormat.push("(");
      for (let i = 0; i < num.length; i++) {
        if (i === 3) {
          newFormat.push(") ");
        } else if (i === 6) {
          newFormat.push("-");
        }
        newFormat.push(num[i]);
      }
      return newFormat.join("");
    } else if (num.length === 12 && num.startsWith("+1")) {
      newFormat.push("+1 (");
      for (let i = 2; i < num.length; i++) {
        if (i === 5) {
          newFormat.push(") ");
        } else if (i === 8) {
          newFormat.push("-");
        }
        newFormat.push(num[i]);
      }
      return newFormat.join("");
    } else {
      return num;
    }
  } catch (err) {
    return num;
  }
};

module.exports  = { formatPhoneNumber};
