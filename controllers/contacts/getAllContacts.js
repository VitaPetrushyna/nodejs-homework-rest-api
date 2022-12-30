const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = getAllContacts;
