const { sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/dbConfig');

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = User;