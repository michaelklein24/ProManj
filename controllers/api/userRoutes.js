const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    console.log(userData.last_name)
    req.session.save(() => {
      
      req.session.first_name = userData.first_name;
      req.session.last = userData.last_name
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.first_name = userData.first_name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/UDS', async(req, res)=>{

  try {
    const updateUser = await User.update({
      first_name: req.body.updateFirst,
      last_name: req.body.updateLast,
      password: req.body.password,
      email: req.body.updateEmail,
    }, {where:{
      id: req.session.user_id
    }}
    )
    req.session.save(() => {
      req.session.logged_in = true;
      
      res.status(200).json(updateUser);
    });


    
  } catch (err) {
    res.status(400).json(err);
  }
  

  
})


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
