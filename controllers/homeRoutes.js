const router = require("express").Router();
const {User,Project, usersToProjects } = require('../models');

//add Project

router.get("/", async (req, res) => {
  res.render('homepage')
});


router.get("/users", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project}],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('projects-dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // res.render('projects-dashboard')

});

router.get("/project", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });
    
    const user = userData.get({ plain: true });
    console.log(user)
    
    res.render('project', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // res.render('project')
});



router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/users');
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/users');
    return;
  }
  res.render("signup");
});

module.exports = router;
