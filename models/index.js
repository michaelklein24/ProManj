const User = require('./User');
const Project = require('./Project');
const usersToProjects = require('./usersToProjects');
const List = require('./List');
const Task = require('./Task');



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

  Project.hasMany(List, {
    foreignKey: 'list_id',
    onDelete: 'CASCADE',
  });

  List.belongsTo(Project, {
    foreignKey: 'list_id'
  });

  List.hasMany(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE',
  });

  Task.belongsTo(Project, {
    foreignKey: 'task_id'
  });
  

 module.exports = { User, Project, usersToProjects };



