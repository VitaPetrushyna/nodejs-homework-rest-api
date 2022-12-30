const { ctrlWrapper } = require("../../helpers");

const addContact = require("./addContact");
const getAllContacts = require("./getAllContacts");
const getByIdContact = require("./getByIdContact");
const removeByIdContact = require("./removeByIdContact");
const updateByIdContact = require("./updateByIdContact");
const updateByIdFavorite = require("./updateByIdFavorite");

module.exports = {
  addContact: ctrlWrapper(addContact),
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  removeByIdContact: ctrlWrapper(removeByIdContact),
  updateByIdContact: ctrlWrapper(updateByIdContact),
  updateByIdFavorite: ctrlWrapper(updateByIdFavorite),
};

// module.exports = {
//   addContact,
// };
