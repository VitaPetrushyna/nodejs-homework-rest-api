const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const User = require("../../models/user");
const { RequestError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpDir, originalname } = req.file;
  const extension = originalname.split(".").pop();
  const newFilename = `${_id}.${extension}`;

  const resultUpload = path.join(avatarsDir, newFilename);

  const image = await Jimp.read(tmpDir);
  await image.resize(250, 250).writeAsync(tmpDir);

  await fs.rename(tmpDir, resultUpload);
  const avatarURL = path.join("avatars", newFilename);
  const user = await User.findByIdAndUpdate(_id, { avatarURL });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  res.status(201).json({
    avatarURL: user.avatarURL,
  });
};

module.exports = updateAvatar;
