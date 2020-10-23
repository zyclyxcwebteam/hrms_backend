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
    const controllerName = "business-enquiries";
    // query email to and cc list from emails-lists collection for careers_form
    const emailList = await strapi
      .query("email-lists")
      .find({ List_Name: "contact_form" });
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[controllerName].create(data, { files });
    } else {
      entity = await strapi.services[controllerName].create(ctx.request.body);
    }

    await strapi.plugins["email"].services.email.send({
      to: emailList[0].To_List,
      from: "skanjarla@zyclyx.com",
      cc: emailList[0].CC_List,
      replyTo: "hr.operations@zyclyx.com",
      subject: `Contact Us Inquiry from - ${ctx.request.body.Website} website`,
      html: `
          <p>Dear Team,</p>
          <p>Please find the inquiry details below from <strong>${ctx.request.body.Website}</strong> website contact us form.</p>          
          <p>Fullname - ${ctx.request.body.Full_Name}</p>         
          <p>Email - ${ctx.request.body.Email}</p>
          <p>Phone - ${ctx.request.body.Phone}</p>
          <p>Message - ${ctx.request.body.Message}</p>            
          <p>Thanks,</p>`,
    });
    return sanitizeEntity(entity, { model: strapi.models[controllerName] });
  },
};
