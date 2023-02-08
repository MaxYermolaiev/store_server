const express = require('express');
const shop_routing = express.Router();
const helper = require("./../helpers/helper");
const {auth_checking,user_authorization,user_authentication} = require('../middleware/AuthMiddleware')
const UserData = require("../db/schemas/user_schema");
const adminSchema = require("../db/schemas/adminSchema");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")



shop_routing.get("/category",auth_checking,authentication.logout);//use for user token validatonn after app launch

module.exports = shop_routing;
