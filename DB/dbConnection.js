import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/SocailMedia').then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Error connection to MongoDB",err);
    })
}

