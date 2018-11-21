var {identitys,limits,users} = require('../index.js'); //导入用户数据
var {randomString} = require('../util');
var common = require('../util/common');
module.exports = (req,res,next)=>{
    // 接收前端的请求
    let {username,userpwd} = req.body;
    // 判断前端的数据
    if(!username || !userpwd){
      res.send({msg:'参数不正确',code:0});
      return;
    }
  
    // 验证用户名和密码
    let findResult = users.find(item=>item.username === username && item.userpwd === userpwd);
    if(!findResult){
      res.send({msg:'用户名密码不比配',code:2});
      return;
    }
    // 用户的身份id
    let id = findResult.id;
    // 生成一个sessionid，用于识别是否登录过
    let sessionid = randomString();
    // 存储到服务端
    common.sessions.push({
      username,id,sessionid,time:new Date().getTime()
    });
    res.send({msg:'登录成功',code:1,sessionid});
  }