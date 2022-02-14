const User = require('./User');
const Project = require('./Project');
const usersToProjects = require('./usersToProjects');



Project.belongsToMany(User, {
    
    through: {
      model: usersToProjects,
      unique: false
    },
    

  });
  
  User.belongsToMany(Project, {
    
    through: {
      model: usersToProjects,
      unique: false
    },
   
  });

 module.exports = { User, Project, usersToProjects };



