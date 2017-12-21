const db = require('../data/db');
const Sequelize = require('sequelize');

const User = db.define('user',{
    uid : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull:false
    },
    isAdmin : {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},{
    freezeTableName : true
});
User.sync();

module.exports = User;


