const router = require("express").Router();
const { User, Project, usersToProjects } = require("../models");

//add Project

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/users", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });
    const userProjects = user.projects;
    const first = req.session.first_name.split("")[0];
    
    
    console.log(userProjects);
    console.log(user);
    res.render("projects-dashboard", {
      user,
      userName: req.session.first_name,
      user_id: userProjects.id,
      first,
      
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    const first = req.session.first_name.split("")[0];

    res.render("project", {
      ...user,
      first,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/users");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/users");
    return;
  }
  res.render("signup");
});

module.exports = router;
