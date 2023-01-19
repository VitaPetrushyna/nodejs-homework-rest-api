const express = require("express");

const ctrl = require("../../controllers/auth");
const router = express.Router();

const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");

const {
  registerSchema,
  loginSchema,
  updateBySubscriptionSchema,
  verifyEmailSchema,
} = require("../../schemas/users");

// signup
router.post("/register", validateBody(registerSchema), ctrl.register);

//signin
router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateBySubscriptionSchema),
  ctrl.updateBySubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  ctrl.updateAvatar
);
// router.get("/verify/:verificationToken", ctrl.verify);
// router.get("/verify", validateBody(verifyEmailSchema), ctrl.resendVerify);

module.exports = router;
