import ToDo from "../models/todo.model.js";
import User from "../models/user.model.js";

// ********************Controller to Create a to do*************************************
const createToDo = async (req , res)=>{
    try{
        const {name , description , dueDate , userId} = req.body;
        // Check if the name of To Do is filled By User or not
        if(!name){
            return res.json({success:false , message : "Please fill the name of the To Do"});
        }

        // Create and save a To Do
        const toDo = new ToDo({
            name ,
            description,
            dueDate,
            userId
        });
        const savedToDo = await toDo.save();

        // Save the created To Do to the User's To Do Array
        const user = await User.findById(userId);
        if (!user) {
            return res.json({success:false , message: "User not found"});
        }
        user.toDos.push(savedToDo._id);
        await user.save();

        // Return success Response
        return res.status(200).json({success:true , message : "To Do Created Successfully" , data : savedToDo});

    }catch(error){
        console.log("Error in Create To Do Controller");
        return res.status(500).json({success:false , message : "Internal Server Error"});
    }
}


// ***************************** Controller to Update a To Do **************************
const updateToDo = async (req , res)=>{
    try{
        const {todoId} = req.params;
        const updates = req.body;
        const updatedToDo = await ToDo.findByIdAndUpdate(todoId , updates , {new:true});
        return res.status(200).json({success:true , message: "To Do Updated Successfully" , data:updatedToDo});
    }catch(error){
        console.log("Error in Update To Do Controller");
        return res.status(500).json({success:false , message : "Internal Server Error"}); 
    }
}


// **************************** Controller to Delete a To Do ****************************
const deleteToDo = async (req , res)=>{
    try{
        const {todoId , userId} = req.body;
        await ToDo.findByIdAndDelete(todoId);
        const user = await User.findByIdAndUpdate(userId , {$pull : {toDos : todoId}} , {new:true});
        return res.status(200).json({success:true , message: "To Do Deleted Successfully"});
    }catch(error){
        console.log("Error in Delete To Do Controller");
        return res.status(500).json({success:false , message : "Internal Server Error"}); 
    }
}


// *********************** Controller to Mark as read a To Do **************************
const markAsRead = async (req , res)=>{
    try{
        const {todoId} = req.body;
        const updatedToDo = await ToDo.findByIdAndUpdate(todoId , {isRead : true} , {new : true});
        return res.status(200).json({success:true , message: "To Do Marked as Read Successfully" , data:updatedToDo});
    }catch(error){
        console.log("Error in Mark as Read Controller");
        return res.status(500).json({success:false , message : "Internal Server Error"}); 
    }
}

export {createToDo , updateToDo , deleteToDo , markAsRead};