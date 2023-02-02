const {Schema,Types,model} = require("mongoose");

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    permissions:{
        read: {type:Boolean,default:true,required:true},
        write:{type:Boolean,default:false,required:true},
        update:{type:Boolean,default:false,required:true},
        remove:{type:Boolean,default:false,required:true}
    },
});
module.exports =model("AdminSchema",AdminSchema);