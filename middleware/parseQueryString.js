
module.exports = (req,res,next)=>{
    let str = ''
    let data;
    req.on('data',chuck=>{
      str += chuck;
    });
    req.on('end',()=>{
      try{
        data = querystring.parse(str)
      }catch(err){
      }
      if(data){
        req.body = data;
      }
      next();
    })
}