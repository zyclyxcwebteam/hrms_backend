"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.payslips.create(data, { files });
    } else {
      entity = await strapi.services.payslips.create(ctx.request.body);
    }
    console.log("Send email notification", entity);
    await strapi.plugins["email"].services.email.send({
      to: "skanjarla@zyclyx.com",
      from: "skanjarla@zyclyx.com",
      cc: "srikanthkanjarla@gmail.com",
      subject: `Payslip ${entity.Month}-${entity.Year}`,
      text: `
        Dear ${entity.Employee_Name},

        Hope you are doing well.
        
        Please find the attached payslip for the month of  ${entity.Month}-${entity.Year}.
        
        If you have any questions, do not hesitate to contact HR.
        
        Thanks & Regards,
        HR Operations  
        `,
    });
    return sanitizeEntity(entity, { model: strapi.models.payslips });
  },
};
