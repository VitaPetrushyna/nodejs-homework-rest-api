const Contacts = require("../models/contacts");

// const { contactSchema } = require("../schemas/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contactById = await Contacts.getContactById(contactId);

  if (contactById) {
    res.json(contactById);
  } else {
    throw HttpError(404);
  }
};

const createContact = async (req, res) => {
  // const validation = contactSchema.validate(req.body);
  const body = req.body;
  const newContact = await Contacts.addContact(body);

  // if (validation.error) {
  //   throw HttpError(400, "Missing required name field");
  // }

  res.json({
    status: "success",
    code: 201,
    data: newContact,
  });
  if (!newContact) {
    throw HttpError(404);
  }
};

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const removeContactById = await Contacts.removeContact(contactId);

  if (removeContactById) {
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } else {
    throw HttpError(404);
  }
};

const updateContact = async (req, res) => {
  // const validation = contactSchema.validate(req.body);

  // if (validation.error) {
  //   return res.status(400).json({ status: validation.error.details });
  // }

  const contactId = req.params.contactId;
  const body = req.body;
  const contactUpdate = await Contacts.updateContact(contactId, body);

  if (contactUpdate) {
    res.json({
      status: "success",
      code: 200,
      data: contactUpdate,
    });
  } else {
    throw HttpError(404);
  }
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
