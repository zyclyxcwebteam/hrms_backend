"use strict";

module.exports = {
  /**
   * send email notifications
   */
  lifecycles: {
    async beforeCreate(data) {
      // get user data here - username and email
      const userId = data.user;
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userId });

      // Update Employee Name in table entry
      data.Employee_Name = user.username;
      if (data.Reported_To === "HR_Manager" || data.Reported_To === "All") {
        data.hr_manager = user.hr_manager;
      }
      if (data.Reported_To === "Line_Manager" || data.Reported_To === "All") {
        data.line_manager = user.line_manager;
      }
      // I am writing to seek your help in resolving a problem that I am experiencing at work
      // send email to the employee
      await strapi.plugins["email"].services.email.send({
        to: `${user.email}`,
        from: "hr.operations@zyclyx.com",
        replyTo: "hr.operations@zyclyx.com",
        subject: "Grievance Acknowledgement",
        html: `
              <p>Dear ${user.username},</p>
               
              <p>I am writing to acknowledge receipt of your formal grievance email sent to<strong> ${
                data.Reported_To === "Line_Manager"
                  ? user.line_manager.Manager_Name
                  : ""
              } ${
          data.Reported_To === "HR_Manager" ? user.hr_manager.Manager_Name : ""
        }
        ${
          data.Reported_To === "All"
            ? user.hr_manager.Manager_Name +
              "</strong> and <strong>" +
              user.line_manager.Manager_Name
            : ""
        }
        </strong> dated ${new Date(data.Complaint_Date)
          .toISOString()
          .slice(0, 10)}.</p>
              <p>We will write to you shortly requesting you to attend a Stage One meeting, in accordance with the ZYCLYX's Grievance Procedure at which you will have the full opportunity to state your case detailing your issues.</p>

              <p>Please do not hesitate to contact HR Team, if you have any questions about this.</p>

              <p>Thanks & Regards,</p>
              <p>HR Operations</p>`,
      });

      // send email to the Manager
      await strapi.plugins["email"].services.email.send({
        to:
          data.Reported_To === "HR_Manager"
            ? user.hr_manager.Manager_Email
            : data.Reported_To === "Line_Manager"
            ? user.line_manager.Manager_Email
            : data.Reported_To === "All"
            ? user.line_manager.Manager_Email +
              "," +
              user.hr_manager.Manager_Email
            : "hr.operations@zyclyx.com",
        from: "hr.operations@zyclyx.com",
        replyTo: "hr.operations@zyclyx.com",
        subject: `Grievance Request from ${user.username}`,
        html: `
              <p>Dear Team,</p>

              <p>Please find the details of a grievance request from <strong>${
                user.username
              }</strong> dated <strong> ${new Date(data.Complaint_Date)
          .toISOString()
          .slice(0, 10)}.</strong></p>

                <p>From ${user.username}</p>
                <p>Event Occured on - ${new Date(data.Event_Time_Date)
                  .toISOString()
                  .slice(0, 10)}</p>
                  <p>Place of Event - ${data.Place_Of_Event}</p>
                  <p>Witness - ${data.Witness ? data.Witness : "N/A"}
                  <p>Account of Event - ${data.Account_Of_Event}</p>
                  <p>Violations - ${data.Violations}</>
              <p>Thanks & Regards,</p>
              <p>HR Operations</p>`,
      });
    },
  },
};
