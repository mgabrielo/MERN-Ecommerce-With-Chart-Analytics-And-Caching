import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../config/axiosInstance";
import { toast } from "react-hot-toast";

export const useCartStore = create(
  persist((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subTotal: 0,
    isCouponApplied: false,

    getCartItems: async () => {
      try {
        const { data } = await axios.get("/cart");
        if (data && data?.cartItems) {
          set({ cart: data.cartItems });
          get().calculateTotal();
        }
      } catch (error) {
        set({ cart: [] });
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    addToCart: async (product) => {
      try {
        const { data } = await axios.post("/cart", { productId: product._id });
        if (data.cart) {
          //   console.log({ user_cart: data.cart });
          toast.success("Added Product To Cart");
          set((state) => {
            const existingCartItem = state.cart.find(
              (item) => item._id === product._id
            );
            let newCartItem;
            if (existingCartItem) {
              newCartItem = state.cart.map((item) => {
                if (item._id === product._id) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                } else {
                  return item;
                }
              });
            } else {
              newCartItem = [...state.cart, { ...product, quantity: 1 }];
            }
            return { cart: newCartItem };
          });
          get().calculateTotal();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    calculateTotal: () => {
      const { cart, coupon } = get();
      const subTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      let total = subTotal;
      if (coupon) {
        const discount = subTotal * (coupon.discountPercentage / 100);
        total = subTotal - discount;
      }
      set({ subTotal, total });
    },
    clearCartItems: async () => {
      try {
        await axios.delete("/cart/clear");
        set({ cart: [], coupon: null, total: 0, subTotal: 0 });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    removeFromCart: async (productId) => {
      try {
        await axios.delete(`/cart/${productId}`);
        set((prev) => ({
          cart: prev.cart.filter((item) => item._id !== productId),
        }));
        get().calculateTotal();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    updateCartQty: async (productId, quantity) => {
      try {
        if (quantity === 0) {
          get().removeFromCart(productId);
          return;
        }
        await axios.put(`/cart/${productId}`, { quantity });
        set((prev) => ({
          cart: prev.cart.map((item) =>
            item._id == productId ? { ...item, quantity } : item
          ),
        }));
        get().calculateTotal();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    getMyCoupon: async () => {
      try {
        const response = await axios.get("/coupons");
        set({ coupon: response.data.coupon });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    applyCoupon: async (code) => {
      try {
        const response = await axios.post("/coupons/validate", { code });
        set({ coupon: response.data, isCouponApplied: true });
        get().calculateTotal();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error occurred in server request"
        );
      }
    },
    removeCoupon: () => {
      set({ coupon: null, isCouponApplied: false });
      get().calculateTotal();
      toast.success("coupon removed");
    },
  }))
);
