"use strict";
const axios = require("axios");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  /**
   * send email notification to employee on payslip upload
   */
  lifecycles: {
    async beforeCreate(data) {
      const id = data.Payslip[0];
      const file = await strapi.plugins.upload.services.upload.fetch({ id });
      const filePath = file.url;

      // get user data here - username and email
      const userId = data.user;
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userId });
      // Update Employee Name in table entry
      data.Employee_Name = user.username;
      const response = await axios.get(filePath, {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data, "base64");
      await strapi.plugins["email"].services.email.send({
        to: `${user.email}`,
        from: "skanjarla@zyclyx.com",
        cc: "skanjarla@zyclyx.com skanjarla@zyclyx.com skanjarla@zyclyx.com",
        replyTo: "hr.operations@zyclyx.com",
        subject: `Payslip - ${data.Month} ${data.Year}`,
        html: `
            <p>Dear ${user.username},</p>

            <p>Hope you are doing well.</p>
            
            <p>Please find the attached payslip for the month of <strong> ${data.Month} - ${data.Year}</strong></p>         
            <p>If you have any questions, do not hesitate to contact HR.</p>
            
            <p>Thanks & Regards,</p>
            <p>HR Operations</p>`,
        attachments: [
          {
            filename: `${user.username}_Payslip_${data.Month}_${data.Year}.pdf`,
            content: buffer,
          },
        ],
      });
    },
  },
};
