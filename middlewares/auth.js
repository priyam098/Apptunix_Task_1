const jwt = require('jsonwebtoken');
const config = require('../config/dev')

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token,config.ACCESS_TOKEN_SECRET,(err,dataObj)=>{
        if(err) return res.sendStatus(403)
        req.dataObj = dataObj;
        next();
    })
}
module.exports.authenticateToken = authenticateToken;