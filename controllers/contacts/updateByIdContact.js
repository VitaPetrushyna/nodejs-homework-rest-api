const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateByIdContact = async (req, res) => {
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

module.exports = updateByIdContact;
