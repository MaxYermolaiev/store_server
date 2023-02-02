const express = require('express');
const auth_routing = express.Router();
const helper = require("./../helpers/helper");
const {auth_checking,user_authorization,user_authentication} = require('../middleware/AuthMiddleware')
const UserData = require("../db/schemas/user_schema");
const adminSchema = require("../db/schemas/adminSchema");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

//General path - http://localhost:3000/api/
class Authentication {
   //when app has been launched in first check token and send response
   async check_user(req,res){
      try{
         return res.status(200).json({message:'OK'});
      }catch (e) {
         return res.status(500).json({message:'Unexpected server error'});
      }
   }
   async logout(req,res){
      try{
         res.session.token=undefined;
         return res.status(200).json({message:'OK'});
      }catch (e) {
         return res.status(500).json({message:'server side error'});
      }
   }
   async authenticate(req,res){
      try{
         //destruct credentials in case missing send error
         const {email,password} = req.credentials;


         const candidate = await UserData.findOne({email});

         if(!candidate){
            return res.status(400).json({message:"Wrong email or user have been not created yet",errors: {email: "Wrong email or user have been not created yet"}})
         }

         let passwordCompareError =await bcrypt.compare(password,candidate.password)

         if(!passwordCompareError){
            return res.status(400).json({message: 'Invalid credentials', errors:{password: "password is not correct"}})
         }
         //if ok, compare hash password with received, and send error if not ok

         const token = jwt.sign({_id: candidate._id}, process.env.JWT,{ expiresIn: '3 days' });
         req.session.token=token;

         return res.status(200).json({_id:candidate._id, token:token});
         //if ok return payload with id and token wich will be stored in client local storage
      }catch (e) {
         return res.status(500).json({message:'server side error'});
      }
   }

   async authorize(req,res){
      //destruct prop and check all fields
      const {password, email, phone, firstname, lastname} = req.body;
      if(!password||!email||!phone||!firstname||!lastname){
         return res.status(400).json({message:"User fields filed not correct"});
      }


      try{
         const candidate = await UserData.findOne({email});
         if(candidate){
            return res.status(400).json({message:"User already exist!,create user with another credentials"});
         }
         //try find user with such email, if exist send error
         let hashPassword = await bcrypt.hash(password,12);
         const new_user = new UserData({password:hashPassword, email, phone, firstname, lastname});
         await new_user.save();
         //else create new user and send 201 success status'

         return res.status(201).json({message:'New user successfully created'})
      }catch (e) {
         return res.status(500).json({message:'Server side error'})}
      }

   async restore(req,res){
      const {email} = req.body;
      try{
         const user = await UserData.findOne({email});
         if(!user){
            return res.status(400).json({message:"User was not found"});
         }
         //Find required user, if not exist send error

         let hashedPassword = await bcrypt.hash('aaaAAA111',12);
         user.password=hashedPassword;
         await user.save();
         //Assign new default password? and send message

         return res.status(200).json({message:'password was discarded to "aaaAAA111" '})
      }catch (e) {
         return res.status(500).json({message:'Server side error'})}
   }
   //---------------------------------------admin part auth===============================

   async createAdmin(req,res){
      //destruct prop and check all fields
      const {password, email, phone, firstname, lastname} = req.body;
      if(!password||!email||!phone||!firstname||!lastname){
         return res.status(400).json({message:"Some field empty!"});
      }
      try{
         const candidate = await adminSchema.findOne({email});
         if(candidate){
            return res.status(400).json({message:"Admin already exist!Create user with another credentials"});
         }
         //try find user with such email, if exist send error
         let hashPassword = await bcrypt.hash(password,12);
         const new_admin = new adminSchema({password:hashPassword, email, phone, firstname, lastname});
         await new_admin.save().then(
             (data)=>{
                console.log(data)
                return res.status(201).json({message:'New admin user successfully created'})},
             ()=>{return res.status(500).json({message:'Some trouble with user creating'})}
         );
      }catch (e) {
         return res.status(500).json({message:'Admin - server side error'})
      }
   }
   async authAdmin(req,res){
      //destruct prop and check all fields
      const {password, email, phone, firstname, lastname} = req.body;
      if(!password||!email||!phone||!firstname||!lastname){
         return res.status(400).json({message:"Some field empty!"});
      }
      try{
         const candidate = await adminSchema.findOne({email});
         if(candidate){
            return res.status(400).json({message:"Admin already exist!Create user with another credentials"});
         }
         //try find user with such email, if exist send error
         let hashPassword = await bcrypt.hash(password,12);
         const new_admin = new adminSchema({password:hashPassword, email, phone, firstname, lastname});
         await new_admin.save().then(
             (data)=>{
                console.log(data)
                return res.status(201).json({message:'New admin user successfully created'})},
             ()=>{return res.status(500).json({message:'Some trouble with user creating'})}
         );
      }catch (e) {
         return res.status(500).json({message:'Admin - server side error'})
      }
   }
}

const authentication = new Authentication();
auth_routing.get("/logout",auth_checking,authentication.logout);//use for user token validatonn after app launch
auth_routing.get("/check-user",auth_checking,authentication.check_user);//use for user token validatonn after app launch
auth_routing.post("/authenticate",user_authentication,authentication.authenticate);
auth_routing.post("/restore",authentication.restore)
auth_routing.post("/authorize",user_authorization,authentication.authorize);
//----------admin auth--------------------//
auth_routing.post("/admin/authorize", authentication.createAdmin);
auth_routing.post("/admin/authenticate", user_authentication, authentication.authAdmin);

module.exports = auth_routing;
