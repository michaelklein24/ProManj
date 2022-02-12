const User = require('./User');
const Project = require('./Project');
const usersToProjects = require('./usersToProjects');



Project.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
      model: usersToProjects,
      unique: false
    },
    // Define an alias for when data is retrieved

  });
  
  User.belongsToMany(Project, {
    // Define the third table needed to store the foreign keys
    through: {
      model: usersToProjects,
      unique: false
    },
    // Define an alias for when data is retrieved
  });

 module.exports = { User, Project, usersToProjects };




  // User.hasMany(Project, {
    //   foreignKey: 'user_id',
    //   onDelete: 'CASCADE'
    // });
    
    // Project.belongsToMany(User, {
    //   foreignKey: 'user_id'
    // });
    
   
    
    
    // //need to add projects to many users