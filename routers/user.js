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
    let userInfo = await User.create({
        account,
        password
    });

    res.send(res.stackResponse(100,'success',userInfo))

});


module.exports = router;