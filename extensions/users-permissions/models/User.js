"use strict";
const axios = require("axios");
module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      axios
        .post(`http://localhost:1337/auth/send-email-confirmation`, {
          email: `${data.email}`,
        })
        .then((response) => {
          console.log("Your user received an email");
        })
        .catch((error) => {
          console.error("An error occurred:", error.response);
        });
    },
  },
};
