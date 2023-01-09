const User = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateBySubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
  res.json({ subscription: user.subscription });
};

module.exports = updateBySubscription;
