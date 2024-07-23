import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
    },
    post:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'post'
    },
   like:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
   }],
   Likes:{
    type:Number
   },
},{
    timestamps:true
});

const commentModel = mongoose.model('comment',commentSchema);

export default commentModel;