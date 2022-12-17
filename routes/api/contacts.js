const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const { contactSchema } = require("../../schemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
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
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

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
});

router.post("/", async (req, res, next) => {
  try {
    const validation = contactSchema.validate(req.body);
    const body = req.body;
    const newContact = await addContact(body);

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
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removeContactById = await removeContact(contactId);

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
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validation = contactSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ status: validation.error.details });
    }

    const contactId = req.params.contactId;
    const body = req.body;
    const contactUpdate = await updateContact(contactId, body);

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
});

module.exports = router;
