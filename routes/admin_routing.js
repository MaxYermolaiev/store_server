const express = require('express');
const admin_router = express.Router();
const {category,goods} = require('../db/schemas/goods_schema');
//path - http://localhost:3000/api/admin/add-category
errorHandler=(error)=>{
    console.log(error)
    if(error.code&&error.code===11000){
        return `${error.keyValue.name} already exist`
    }else{
        return error.message
    }
}
class AdminMethods {
    async add_category(req, res) {

        let {name,src} = req.body;
        if (!name){
            return res.status(400).json({message: "category name is not provided"});
        }
        try{
            let new_category = await category.create({name:name,src:src});
            let err = new_category.validateSync();
            console.log(err.errors)
            return res.status(201).json({data:new_category});
        }catch (e) {
            return res.status(500).json({message:`Admin error,message - ${errorHandler(e)}`});
        }
    }
}

const admin_methods = new AdminMethods();
admin_router.post("/admin/add-category", admin_methods.add_category);

module.exports = admin_router;
