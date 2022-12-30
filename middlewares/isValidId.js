const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    next(HttpError(404, `${contactId} isn't valid, try again`));
  }
  next();
};

module.exports = isValidId;
