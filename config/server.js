module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://admin-zyclyx.herokuapp.com/",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "57fc184bee8d6470793757761dffc185"),
    },
  },
});
