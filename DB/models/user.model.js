import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email is unique'],
        trim:true
    },
    password:{
        type:String,
        minLength:[4,"password is too short"],
        maxLength:[100,"password is too long"],
        required:true
    },
    isOnline: {
        type: Boolean,
        default: false
    }, 
    isActive:{
        type:Boolean,
        default:true,
    },
    changePasswordAt:Date,
},{
    timestamps:true
});
userSchema.pre("save",function(){
    this.password = bcrypt.hashSync(this.password,7)
})
userSchema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,7)
})
const userModel = mongoose.model('user',userSchema);

export default userModel;