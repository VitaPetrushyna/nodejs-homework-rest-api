const Contacts = require("../models/contacts");

const { contactSchema } = require("../schemas/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({
      status: "Success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await Contacts.getContactById(contactId);

    if (contactById) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contactById,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const validation = contactSchema.validate(req.body);
    const body = req.body;
    const newContact = await Contacts.addContact(body);

    if (validation.error) {
      throw RequestError(400, "Missing required name field");
    }

    res.json({
      status: "success",
      code: 201,
      data: newContact,
    });
    if (!newContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removeContactById = await Contacts.removeContact(contactId);

    if (removeContactById) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const validation = contactSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ status: validation.error.details });
    }

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
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
