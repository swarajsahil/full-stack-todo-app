import bcrypt from "bcrypt";
import { user } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
    const userData=await user.findOne({email});
    if(userData)
    {
        return next(new ErrorHandler("Already register, login",400));
    }
        const hassedPassword=await bcrypt.hash(password,10);
        await user.create({
            username,
            email,
            password:hassedPassword
        })
        sendCookie(userData, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}
export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
    const userData=await user.findOne({email});
    if(userData){
        let isMatched=await bcrypt.compare(password,userData.password);
        if(isMatched){
            // const token=jwt.sign({ _id:userData._id },"kfdgksfgjbsdbsfsd");
            // res.cookie("token",token,{
            //     httpOnly:true,
            //     expires:new Date(Date.now()+15*60*1000)
            // }).json({
            //     message:"login Successfully"
            // })  
            sendCookie(userData, res, `login successfully`, 200);
        }
    }else{
        res.json({message:"Don't have account create first"})
    }
    } catch (error) {
        next(error);
    }
}
export const getMyProfile=(req,res,next)=>{
    try {
        res.json({
            user:req.user
        })
    } catch (error) {
        next(error);
    }
}
export const logout = (req, res,next) => {
   try {
     // Clear the token cookie by setting it to an empty value and setting an expired date
     res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true
    }).json({
        message: "Logged out successfully",
    });
   } catch (error) {
    next(error);
   }
};


// previous api-development route


/*
export const updateUser=async(req,res)=>{
    let identity=req.params.id;
    let data=await contentData.findOne({title:identity});
    if(data){
        await contentData.updateOne({
            title:req.body.title,
            content:req.body.content
        });
        res.send("Data updated succesfully");
    }else{
        res.send("Error in updating...");
    }
}

export const updateUserSomeDetail=async(req,res)=>{
    let identity=req.params.id;
    let data=await contentData.findOne({title:identity});
    if(data){
        await contentData.updateOne({
            title:req.body.title
        });
        res.send("partial Data updated succesfully");
    }else{
        res.send("Error in updating...");
    }
}

export const deleteUser=async(req,res)=>{
    try {
        const { id } = req.params;
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (deletedArticle) {
          res.json({ message: "Article deleted successfully" });
        } else {
          res.status(404).json({ error: "Article not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
}
export const getUser=async(req,res)=>{
    let data=await contentData.find();
    res.json(data);
}
export const postUser=async(req,res)=>{
    let data={
        title:req.body.title,
        content:req.body.content
    }
    await contentData.create(data);
    res.send("Article created successfully");
}


*/