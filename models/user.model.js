import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique : true
    },
    password : {
        type : String,
        required:true, 
    },
    toDos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ToDo'
    }]
});

const User = mongoose.model('User' , userSchema);

export default User;