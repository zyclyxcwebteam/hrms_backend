"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    const controllerName = "job-applications";
    // query email to and cc list from emails-lists collection for careers_form
    const emailList = await strapi
      .query("email-lists")
      .find({ List_Name: "careers_form" });
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[controllerName].create(data, { files });
      await strapi.plugins["email"].services.email.send({
        to: emailList[0].To_List,
        from: "skanjarla@zyclyx.com",
        cc: emailList[0].CC_List,
        replyTo: "hr.operations@zyclyx.com",
        subject: `Job Applicaton - ${data.Position}`,
        html: `
            <p>Dear Team,</p>

            <p>Please find the applicant details and attached resume below for <strong>${data.Position}</strong> position from ${data.Website} website.</p>
            
            <p>Fullname - ${data.Firstname} ${data.Lastname}</p>         
            <p>Email - ${data.Email}</p>
            <p>Phone - ${data.Phone}</p>
            <p>Message - ${data.Message}</p>
            
            <p>Thanks,</p>
             `,
        attachments: [
          {
            filename: files.Resume.name,
            content: files.Resume,
          },
        ],
      });
    } else {
      entity = await strapi.services[controllerName].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models[controllerName] });
  },
};
