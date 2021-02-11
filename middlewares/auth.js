const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader.split(' ')[1]);
    if(!token) res.sendStatus(401);
    jwt.verify(token,config.ACCESS_TOKEN_SECRET,(err,dataObj)=>{
        if(err) return res.sendStatus(403)
        req.dataObj = dataObj;
        next();
    })
}
module.exports. authenticateToken = authenticateToken;