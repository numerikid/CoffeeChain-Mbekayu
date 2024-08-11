const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/addUser', userController.addUser);

router.get("/login", (req, res) => {
    return res.render("login")
})

module.exports = router;
