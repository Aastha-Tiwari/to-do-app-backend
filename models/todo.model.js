import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description: {
        type: String,
        default: ""
    },
    dueDate : {
        type : String,
    },
    isRead : {
        type : Boolean,
        default : false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ToDo = mongoose.model('ToDo' , toDoSchema);

export default ToDo;