const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const {
  contactSchema,
  updateByFavoriteSchema,
} = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getByIdContact);

router.post("/", authenticate, validateBody(contactSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeByIdContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchema),
  ctrl.updateByIdContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateByFavoriteSchema),
  ctrl.updateByIdFavorite
);

module.exports = router;
