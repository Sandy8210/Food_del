import userModel from "../models/userModel.js";

//  ADD ITEMS TO THE CART
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res
      .status(200)
      .json({ success: true, message: "Your Item add to the cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Your item not add the cart" });
  }
};

// REMOVE ITEMS TO THE CART
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res
      .status(200)
      .json({ success: true, message: "Your Item will be removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

// FETCH USER CART DATA
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Can't fetch the data" });
  }
};

export { addToCart, removeFromCart, getCart };
