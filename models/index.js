const User = require('./User');
const Project = require('./Project');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };


//need to add projects to many users

// Traveller.belongsToMany(Location, {
//     // Define the third table needed to store the foreign keys
//     through: {
//       model: Trip,
//       unique: false
//     },
//     // Define an alias for when data is retrieved
//     as: 'planned_trips'
//   });
  
//   Location.belongsToMany(Traveller, {
//     // Define the third table needed to store the foreign keys
//     through: {
//       model: Trip,
//       unique: false
//     },
//     // Define an alias for when data is retrieved
//     as: 'location_travellers'
//   });