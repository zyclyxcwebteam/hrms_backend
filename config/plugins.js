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
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_KEY"),
    },
    settings: {
      defaultFrom: "skanjarla@zyclyx.com",
      defaultReplyTo: "skanjarla@zyclyx.com",
    },
  },
});
