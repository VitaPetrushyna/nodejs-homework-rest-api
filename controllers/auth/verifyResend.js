const User = require("../../models/user");
const { HttpError, createEmail, sendEmail } = require("../../helpers");

const verifyResend = async (req, res, next) => {
  const { email } = req.body;
  const user = User.findOne(email);
  if (!user) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = createEmail(email, user.verificationCode);

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyResend;
