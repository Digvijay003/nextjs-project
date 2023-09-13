import mongoose, { Schema, model } from "mongoose";

const contactSchema=new Schema({
    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    }
   
},
{
    timestamps:true
})


const myModelsForContacts=mongoose.models.myModelsForContacts||mongoose.model("myModelsForContacts",contactSchema)
export default myModelsForContacts