import mongoose, { Schema, model } from "mongoose";

const mymodelForEmailSchema=new Schema({
    email:{
        type:String,
        unique:true,
       
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"],
       
       
    }
},
{
    timestamps:true
})


const myModelsForEmail=mongoose.models.myModelsForEmail||mongoose.model("myModelsForEmail",mymodelForEmailSchema)
export default myModelsForEmail
