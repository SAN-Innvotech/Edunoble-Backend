
const router = require("express").Router({ mergeParams: true });

router.use("/auth", require("./auth/auth.router"));
router.use("/papers", require("./papers/paper.router"));
router.use("/contact", require("./contact/contact.router"));
router.use("/testimonials", require("./testimonials/testimonial.router"));

module.exports = router;
