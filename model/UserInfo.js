const db = require('../data/db');
const Sequelize = require('sequelize');

const UserInfo = db.define('userInfo',{
    uid : {
        type : Sequelize.INTEGER(11),
        allowNull: false,
    },
    isAdmin : {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    isWorking : {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    },
    avatar : {
        type : Sequelize.STRING(300),
        defaultValue : 'https://fs.img4399.com/ma~330_20171223205547_5a3e52537158c.jpeg?t=1514033747'
    },
    inTheTime : {//加入时间
        type : Sequelize.STRING(300),
        defaultValue :  new Date().toString()
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
UserInfo.sync();



module.exports = UserInfo;


