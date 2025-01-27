import jwt from "jsonwebtoken";

const checkAuthorizedUser = (req , res , next)=> {
    try{
        const authHeader =  req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.json({success:false , message : "Not Authorized"});
        }

        // if we get token , so we have to verify it whether it belongs to some user or not
        jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user)=> {
            if(err){
                return res.json({success:false , message:"Please sign in Again"});
            }
            req.user = user;
            next();
        });       
    }
    catch(error){
        console.log("Error in check authorized user middleware" , error);
        return res.status(500).json({success : false , message : "Internal Server Error"});
    }
}

export {checkAuthorizedUser};