import mongoose from "mongoose";
// import Product from "../models/Product.js";
import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    const cartItems = user.cart.map((cartItem) => ({
      ...cartItem?.product?.toJSON(),
      quantity: cartItem.quantity,
    }));

    res.status(200).json({ cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingCartItem = user.cart.find((item) => item.id === productId);
    if (existingCartItem) {
      if (quantity == 0) {
        user.cart = user.cart.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cart);
      }
      existingCartItem.quantity = quantity;
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const updateQuery = productId
      ? { $pull: { cart: { product: productId } } }
      : { $set: { cart: [] } };

    await User.updateOne({ _id: user._id }, updateQuery);

    const updatedUser = await User.findById(user._id).populate("cart.product");

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;
    await User.updateOne({ _id: user._id }, { $set: { cart: [] } });

    const updatedUser = await User.findById(user._id).populate("cart.product");

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};
