const {Schema,Types,model} = require("mongoose");

const user_schema = new Schema({
    email:{
        type:String,
        required:[true,"Email is not provided"],
        unique:[true,"Email already used"],
        validate:{
            validator:(str)=>/^([A-Za-z0-9])+@([A-Za-z0-9_])+\.([A-Za-z]{2,4})$/.test(str),
            message:"Email is not correct, hint myemail@service.com"
        }
    },
    password:{
        type:String,
        required:[true,"Password is not provided"],
        validate:{
            validator:(str)=>/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,32}/.test(str),
            message:"Minimum one capital and lower letter, and digit.Min length 8"
        }
    },
    phone: {
        type:String,
        required:[true,"Phone is not provided"],
        unique:[true,"Phone already used"],
        validate:{
            validator:(v)=>/^(\+380)(99|50|95|66|93|96|97|63)([0-9]){7}/.test(v)&&v.length===13,
            message:"Phone is not suit example +380991122333"
        }
    },
    firstname: {
        type: String,
        trim: true,
        match:[/^[A-z]+$/ ,"First name contain not allowed sign"],
        minLength:[3, "First name too short"],
        maxLength:[12, "First name too long"],
        required:true,
    },
    lastname: {
        type: String,
        trim: true,
        match:[/^[A-z]+$/ ,"Last name contain not allowed sign"],
        minLength:[3, "Last name too short"],
        maxLength:[12, "Last name too long"],
        required:true,
    },
    isAdmin:{type:Boolean,default:false,required:true},
}, {timestamps:true});

module.exports =model("UserSchema",user_schema)