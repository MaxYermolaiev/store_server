const {Schema, Types, model} = require("mongoose");

const category_schema = new Schema({
    category: {
        type: String,
        required: true,
        unique: [true,'category already exist']
    },
    src: {
        type: String,
        default: 'https://cdn.jetphotos.com/400/6/97621_1643277460.jpg?v=0',
    },
    goods: {
        ref: 'GoodsSchema',
        type: Types.ObjectId,
    },
});

const goods_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    currency: {
        type: String,
        default: 'uah',
        required: true,
    },
    comments: [
        new Schema({
            comment: String,
            author: {
                ref: 'UserSchema',
                type: Types.ObjectId
            }
        })
    ],
    rates: [
        new Schema({

            rate: {
                type: Number,
                min: 0, max: 5
            },
            author: {
                ref: 'UserSchema',
                type: Types.ObjectId
            }
        })
    ]
})

const category = model("CategorySchema", category_schema);
const goods = model("GoodsSchema", category_schema)
module.exports = {category, goods}