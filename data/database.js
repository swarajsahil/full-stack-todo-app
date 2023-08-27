import mongoose from "mongoose";
export const databaseConnected=()=>{
    mongoose.connect(process.env.MONGO_URL,{
    dbName:"api-dev"
}).then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log("error",err);
})
}