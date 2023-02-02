const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const User = require("../../models/user");

const { HttpError, sendEmail, createEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationCode,
  });

  const mail = createEmail(email, verificationCode);

  await sendEmail(mail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
