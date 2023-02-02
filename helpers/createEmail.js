// require("dotenv").config();

const { BASE_URL } = process.env;

const createEmail = (email, verificationCode) => {
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  return verifyEmail;
};

module.exports = createEmail;
