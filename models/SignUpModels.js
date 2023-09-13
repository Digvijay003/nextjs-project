import mongoose, { Schema, model } from "mongoose";

const Myschema=new Schema({
    name:{
        type:String,
        required:[true,'Fullname is required'],
        maxLength:[40,'maxmimum length should be less than 40 characters'],
        minLength:[5,'Fullnmae should be greater than 5 characters']
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
      
    },
    confirmPassword:{
        type: String,
        required: [true, "Password is required"],
      
    }
   
}, 
{
    timestamps:true
})

const myModelForLogin=mongoose.models.myModelForLogin||mongoose.model("myModelForLogin",Myschema)
export default myModelForLogin
