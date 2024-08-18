var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var isLoggedIn = require('../middlewares/isLoggedin');
var {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/authcontrol');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login', { error: req.flash('error'), islogin: req.flash("login") });
});

router.get('/register', (req, res) => {
  res.render('register', { again: req.flash("again"), exist: req.flash("exist") });
});

router.get("/home", isLoggedIn, (req, res) => {
  res.render("home", { user: req.user });
});

// route for registration.
router.post("/create", registerUser);

router.post("/login", loginUser);

// Route for logout
router.get("/logout", logoutUser);
module.exports = router;
