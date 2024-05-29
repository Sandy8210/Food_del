import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controller/foodController.js";

const foodRouter = express.Router();

// IMAGE STORAGE ENGINE

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// ! http://localhost:8080/api/food/add
foodRouter.post("/add", upload.single("image"), addFood);

// ! http://localhost:8080/api/food/list
foodRouter.get("/list", listFood);

// ! http://localhost:8080/api/food/delete
foodRouter.post("/delete", removeFood);
// foodRouter.post("/delete", removeFood);  ==> SAME <== foodRouter.delete("/delete", removeFood);

export default foodRouter;
