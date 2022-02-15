const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        task_content: {
            type:DataTypes.STRING,
            allowNull: true,
        },
        list_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'list',
                key: 'id'
            }
        }
    },
  {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    },
);

module.exports = Task;
