"use strict";

module.exports = {
  /**
   * send email notification to employee on payslip upload
   */
  lifecycles: {
    async beforeCreate(data) {
      // get user data here - username and email
      const userId = data.user;
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userId });
      console.log(user);
      /*
        hr_manager.Manager_Email
        hr_manager.Manager_Name
        line_manager.Manager_Email
        line_manager.Manager_Name
      */
      // Update Employee Name in table entry
      data.Employee_Name = user.username;
      //   await strapi.plugins["email"].services.email.send({
      //     to: `${user.email}`,
      //     from: "hr.operations@zyclyx.com",
      //     replyTo: "hr.operations@zyclyx.com",
      //     subject: `Acknowledgment - ${data.Policy_Type}`,
      //     html: `
      //         <p>Dear ${user.username},</p>

      //         <p>Hope you are doing well.</p>

      //         <p>I have read and been informed about the content, requirements, and expectations of the ${data.Policy_Type} for employees at ZYCLYX.</p>
      //         <p>I have received a copy of the policy and agree to abide by the policy guidelines as a condition of my employment and my continuing employment at ZYCLYX.</p>

      //         <p>If you have any questions, do not hesitate to contact HR.</p>

      //         <p>Thanks & Regards,</p>
      //         <p>HR Operations</p>`,
      //   });
    },
  },
};
