var common = require('../util/common');
module.exports = (req,res,next)=>{
    let method = req.method;
    let sessionid = req[method==='POST'?'body':'query'].sessionid;
    console.log(sessionid);
    if(req.path === '/users/login' && method === 'POST'){
      next();
      return;
    }
    // 验证是否登录过
    let userLoginInfo = common.sessions.find(item=>item.sessionid === sessionid);
    if(!userLoginInfo){
      res.send({msg:'请登录后，再访问',code:0});
      return;
    }
    // 验证时间是否失效
    if(!((new Date().getTime() - userLoginInfo.time) < 2*60*60*1000)){
      res.send({msg:'凭证失效',code:0});
      return;
    }
    next();

}