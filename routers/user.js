const express = require('express');
const router = express.Router();
const UserInfo = require('../model/UserInfo');
const User = require('../model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * 获取所有的用户情况列表
 */
router.get('/user/manage',async (req,res,next)=>{
    let userInfoList = await UserInfo.findAll({
        order : [['uid','DESC']]
    });
    res.send(res.stackResponse(100,'success',userInfoList))

});

/**
 * 添加用户
 * @method post
 * @param account password username
 */

router.post('/user/add',async (req,res,next)=>{
    let {userInfo : {isAdmin},body : {account,password,userName}} = req;
    //权限校验
    if(!isAdmin){
        return res.send(res.stackResponse(98,'您不是管理员~~',{}));
    }
    if(!account || !password || userName){
        return res.send(res.stackResponse(99,'参数不足~~',{}));
    }
    let users = User.findAll({
        where : {
            account
        }
    });
    if(users.length > 0){
        return res.send(res.stackResponse(99,'该账号已存在~~',{}));
    }

    let userInfo = await User.create({
        account,
        password
    });

    UserInfo.create({
        uid : userInfo.uid
    });

    res.send(res.stackResponse(100,'添加成功',{}))

});


/**
 * 获取单个用户的信息
 * @param uid
 * @method get
 */
router.get('/user/findOne',async (req,res,next)=>{
    let {query:{uid}} = req;
    let users = await UserInfo.findAll({
        where : {
            uid
        }
    });
    if(users.length == 0){
        return res.send(res.stackResponse(99,'查找的用户不存在',users))
    }
    res.send(res.stackResponse(100,'success',users[0]))
});


/**
 * 编辑单个用户的信息
 * @param uid
 * @method get
 */


module.exports = router;