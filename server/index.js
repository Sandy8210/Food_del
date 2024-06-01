import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// APP CONFIG

const app = express();
const PORT = 8080;

// MIDDLEWARE

app.use(express.json());
app.use(cors());

// DB CONNECTION

connectDB();

// API ENDPOINTS

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working API Perfect" });
});

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
