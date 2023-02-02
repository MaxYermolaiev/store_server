module.exports = {
    key: 'token',
    secret:'user_token',
    resave:false,
    rolling:true,
    saveUninitialized: false,
    cookie:{
        httpOnly:false,
        secure:false,
        maxAge: 1000*60*60*25*10//10 days
    }
}