const jwt = require('jsonwebtoken')
const secret = process.env.JWT;

const user_authentication = (req, res, next) => {
    const authentication = req.headers['authorization'];

    const [type, credentials] = authentication.split(' ');
    const [email, password] = Buffer.from(credentials, 'base64')
        .toString()
        .split(':');

    if (!email || !password) {
        return res.status(400).json({message: 'credentials are not delivered'});
    }

    const isErrors = null//validate.test({email, password})
    if (isErrors) {
        res.status(400).json({
            message: 'credentials are not corresponds criteria',
            error: isErrors
        });
    }
    req.credentials = {email, password}
    next();
}
const landing_middleware = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        let {token} = req.session;
        let {x_token} = req.headers['x-token'];
        if(token===undefined&&x_token===undefined){
            res.status(400).json({message:"User is not authorized"})
        }
        token = token?await jwt.verify(token, secret):undefined;
        x_token = x_token?await jwt.verify(x_token, secret):undefined;
        req.credentials = {token,x_token}
        next();
    } catch (e) {
        res.status(500).json({message: "Landing error"});
    }
}


const auth_checking = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        let {token} = req.session;
        let decoded = await jwt.verify(token, secret);
        res.credential = decoded;
        next();
    } catch (e) {
        res.status(500).json({message: "Server side error"});
    }
}

/*
const  auth_checking = async (req,res,next)=>{
    req.method==="OPTIONS"?next:null;
    try{
        const token = req.headers['x-token'];
        if(!token){
            return res.status(401).json({message: "Token is not available any more, login again"});
        }
        let decoded = await jwt.verify(token,secret);
        req.credential = decoded;
        next()
    }catch(e){
        res.status(500).json({message: "Server side error"})
    }
}
*/
module.exports = {landing_middleware,auth_checking, user_authentication}


