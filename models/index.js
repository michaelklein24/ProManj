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
  constraints: false

});

User.belongsToMany(Project, {

  through: {
    model: usersToProjects,
    unique: false
  },

});

List.belongsTo(Project, {
  constraint: false,
  foreignKey: 'project_id',
  onDelete: 'CASCADE'
});

Project.hasMany(List, {
  foreignKey: 'project_id',
});

Task.belongsTo(List, {
  constraint: false,
  foreignKey: 'list_id',
  onDelete: 'CASCADE'
});

List.hasMany(Task, {
  foreignKey: 'list_id',
})

module.exports = { User, Project, usersToProjects, List, Task };



