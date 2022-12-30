const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const addContact = async (req, res) => {
  const body = req.body;
  const newContact = await Contact.create(body);

  res.json({
    status: "success",
    code: 201,
    data: newContact,
  });
  if (!newContact) {
    throw HttpError(404);
  }
};

module.exports = addContact;
