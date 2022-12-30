const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getByIdContact = async (req, res) => {
  const contactId = req.params.contactId;
  const contactById = await Contact.findById(contactId);

  if (contactById) {
    res.json(contactById);
  } else {
    throw HttpError(404);
  }
};

module.exports = getByIdContact;
