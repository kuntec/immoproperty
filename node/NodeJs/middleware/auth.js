const jwt = require('jsonwebtoken');
const config = require('config');
var secret = config.get('jwtPrivateKey');

function auth(req,res,next){
    console.log('token Before',req);
    const token = req.header('x-auth-token');
    console.log('token Get',token);
    if(!token) return res.status(401).send('Access Denied. No Token Provided');
try{
    const decoded= jwt.verify(token,secret);
    res.user = decoded;
    next();
}catch(ex){
    res.status(400).send('Invalid Token');
}
}
module.exports = auth;