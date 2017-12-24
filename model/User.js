const db = require('../data/db');
const Sequelize = require('sequelize');

const User = db.define('user',{
    uid : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    account : {
        type : Sequelize.STRING(30),
        allowNull : false
    },
    username : {
        type : Sequelize.STRING(30),
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull:false
    },
    isAdmin : {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    isWorking : {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    },
    group : {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    },
    avatar : {
        type : Sequelize.STRING(300),
        defaultValue : 'https://fs.img4399.com/ma~330_20171223205547_5a3e52537158c.jpeg?t=1514033747'
    },
    inTheTime : {
        type : Sequelize.STRING(300),
        defaultValue :  new Date().toString()
    }
},{
    freezeTableName : true
});
User.sync();



module.exports = User;


