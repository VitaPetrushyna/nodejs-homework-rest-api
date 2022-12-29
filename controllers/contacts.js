const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contactById = await Contact.findById(contactId);

  if (contactById) {
    res.json(contactById);
  } else {
    throw HttpError(404);
  }
};

const createContact = async (req, res) => {
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

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const removeContactById = await Contact.findByIdAndRemove(contactId);

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
  const contactId = req.params.contactId;
  const body = req.body;
  const contactUpdate = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

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

const updateFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  if (body === null) {
    throw HttpError(400, "Missing field favorite");
  }

  const updateStatusContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (updateStatusContact) {
    res.json({
      status: "success",
      code: 200,
      data: updateStatusContact,
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
