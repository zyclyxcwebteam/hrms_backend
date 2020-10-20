module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
  email: {
    provider: "smtp",
    providerOptions: {
      host: "smtp.gmail.com", //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      username: "skanjarla@zyclyx.com",
      password: "dnxusjsfnorgvymw",
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: "skanjarla@zyclyx.com",
      replyTo: "hr.operations@zyclyx.com",
    },
  },
  // email: {
  //   provider: "sendgrid",
  //   providerOptions: {
  //     apiKey: env("SENDGRID_KEY"),
  //   },
  //   settings: {
  //     defaultFrom: "skanjarla@zyclyx.com",
  //     defaultReplyTo: "skanjarla@zyclyx.com",
  //   },
  // },
});
