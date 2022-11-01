const router = require("express").Router()
const {LOGIN, SIGNUP} = require("../controllers/userControllers")

router.post('/login', LOGIN)
router.post('/signup', SIGNUP)

module.exports = router;