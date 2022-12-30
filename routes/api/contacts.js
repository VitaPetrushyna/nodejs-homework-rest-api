const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getByIdContact,
  addContact,
  removeByIdContact,
  updateByIdContact,
  updateByIdFavorite,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const {
  contactSchema,
  updateByFavoriteSchema,
} = require("../../schemas/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getByIdContact);

router.post("/", validateBody(contactSchema), addContact);

router.delete("/:contactId", isValidId, removeByIdContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  updateByIdContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateByFavoriteSchema),
  updateByIdFavorite
);

module.exports = router;
