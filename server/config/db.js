import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/Food_Delivery")
    .then(() => console.log("DB connect Successful"))
    .catch((err) => console.log(err));
};
