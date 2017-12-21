const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const Login = require('../Model/Login');
const md5 = require('md5');
/*
 * admin 登录
 * */
router.get('/login',(req,res,next)=>{
    res.render('admin/login.html');
});

router.post('/login',async (req,res,next)=>{
    let {body : {username,password}} = req;
    let data  = await User.findAll({where : {username : username}});
    if(data.length === 0){
        return res.send(res.stackResponse(99,'用户不存在'));
    }
    if(data[0].username !== username || data[0].password !== password){
        return res.send(res.stackResponse(99,'账号或密码错误',data));
    }
    let cookie = md5(username + password.slice(0,5) + new Date().getTime()); //账号 + 密码的5位数  +  时间粗
    let cookieData = await Login.findAll({where : {uid : data[0].uid}});
    if(cookieData.length === 0){ //表示数据库里面没有这个cookie
        Login.create({
            uid : data[0].uid,
            cookie : cookie
        });
    }else{
        Login.update({
            cookie:cookie
        },{
            where : {
                uid : data[0].uid
            }
        })
    }
    req.cookie.set('cookie',cookie);
    res.send(res.stackResponse(100,'登录成功~',{}));
});

module.exports = router;