import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    if (con) {
      console.log("connecte to database");
    } else {
      console.log("fail to connect with database");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectionDb;
