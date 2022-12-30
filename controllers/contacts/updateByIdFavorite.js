const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateByIdFavorite = async (req, res) => {
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

module.exports = updateByIdFavorite;
