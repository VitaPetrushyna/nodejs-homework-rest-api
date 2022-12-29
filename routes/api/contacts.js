const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {
  contactSchema,
  updateByFavoriteSchema,
} = require("../../schemas/contacts");

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(contactSchema), ctrl.createContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateByFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
