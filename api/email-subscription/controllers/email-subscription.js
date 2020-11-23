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
    const controllerName = "email-subscription";
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
      from: "hr.operations@zyclyx.com",
      cc: emailList[0].CC_List,
      replyTo: "hr.operations@zyclyx.com",
      subject: `Newsletter Email Subscription`,
      html: `
          <p>Dear Team,</p>
          <p>Please find the email address from news letter subscription form.</p>          
          <p>Email - ${ctx.request.body.Subscriber_Email}</p>                    
          <p>Thanks,</p>`,
    });
    return sanitizeEntity(entity, { model: strapi.models[controllerName] });
  },
};
