import { Router } from "express";
import { createToDo, deleteToDo, markAsRead, updateToDo } from "../controllers/todo.controller.js";
import { checkAuthorizedUser } from "../middlewares/user.middleware.js";

const toDoRouter = Router();

toDoRouter.post("/create" , checkAuthorizedUser , createToDo);
toDoRouter.put("/update/:todoId" , checkAuthorizedUser , updateToDo);
toDoRouter.delete("/delete" , checkAuthorizedUser , deleteToDo);
toDoRouter.put("/mark-as-read" , checkAuthorizedUser , markAsRead);

export default toDoRouter;