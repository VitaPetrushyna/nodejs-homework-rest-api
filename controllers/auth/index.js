const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateBySubscription = require("./updateBySubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateBySubscription: ctrlWrapper(updateBySubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
