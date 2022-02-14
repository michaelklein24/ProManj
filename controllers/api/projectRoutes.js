const router = require('express').Router();
const { User,Project, usersToProjects } = require('../../models');


router.post('/', async (req, res) => {
    console.log(req.body)
    try {
      const newProject = await Project.create({
        ...req.body,
        projectId: req.session.userId,
        
      
      });
    
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
    router.post('/UTR', async (req, res) => {
      const userData = await User.findOne({ where: { first_name: req.body.user_id } });
      const projectData = await Project.findOne({ where: { name: req.body.project_id } });
console.log(userData)
console.log(projectData)

        try {
          const newkey = await usersToProjects.create({
            user_id:userData.id,
            project_id:projectData.id,
          })
          
          res.status(200).json(newkey);
        } catch (err) {
          res.status(400).json(err);
        }
      });
  
  













module.exports = router;