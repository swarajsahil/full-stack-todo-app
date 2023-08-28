// import mongoose from "mongoose";
// const articleSchema=new mongoose.Schema({
//     title:String,
//     content:String
// })
// export const contentData=mongoose.model("collection",articleSchema)

import mongoose from "mongoose";
const blogSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})
export const user=mongoose.model("collection",blogSchema)