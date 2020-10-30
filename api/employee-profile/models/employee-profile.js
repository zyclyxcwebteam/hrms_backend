"use strict";
module.exports = {
  /**
   * get Username and use it to update Employee_Name
   */
  lifecycles: {
    async beforeCreate(data) {
      // get user data here - username to use it for Employee_Name
      const userId = data.user;
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userId });
      // Update Employee Name in table entry
      data.Employee_Name = user.username;
    },
  },
};
