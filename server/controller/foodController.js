import foodModel from "../models/foodModel.js";
import fs from "fs";

// ADD FOOD ITEM

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.status(200).json({ success: true, message: "Food Added Successfuly" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Failed add Food Item" });
  }
};

// ALL FOOD LIST

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error" });
  }
};

// REMOVE FOOD ITEM

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food Removed Successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Food Removed Failed" });
  }
};

export { addFood, listFood, removeFood };
