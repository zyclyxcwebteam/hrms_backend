"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    let name = "business-enquiries";
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      /* eslint-disable */
      entity = await strapi.services[name].create(data, { files });
    } else {
      entity = await strapi.services[name].create(ctx.request.body);
    }
    console.log("Send email notification", entity);
    await strapi.plugins["email"].services.email.send({
      to: "skanjarla@zyclyx.com",
      from: "skanjarla@zyclyx.com",
      cc: "skanjarla@zyclyx.com",
      subject: "business enquiry from - website",
      text: `
        Dear Team,

        Hope you are doing well.
        
        Please find the enquiry details below from ${entity.Website}.
        
         Full Name : ${entity.Full_Name}

         Phone : ${entity.Phone}

         Email : ${entity.Email}

         Message: ${entity.Message}
        
        Thanks & Regards,
           
        `,
    });
    return sanitizeEntity(entity, { model: strapi.models[name] });
  },
};
