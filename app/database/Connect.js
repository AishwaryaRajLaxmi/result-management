import mongoose from 'mongoose';
const Connect=async()=>{
  try{
   return await mongoose.connect("mongodb://127.0.0.1:27017/resultmanagement_db");
  }catch(error){
  throw new Error("database connection error"+error.message);
  }
}

export default Connect;