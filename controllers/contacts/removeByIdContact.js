const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const removeByIdContact = async (req, res) => {
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

module.exports = removeByIdContact;
