const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class usersToProjects extends Model {}


usersToProjects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userstoprojects'
  }
);

module.exports = usersToProjects;