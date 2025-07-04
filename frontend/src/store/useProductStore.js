import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../config/axiosInstance";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const { data } = await axios.post("/products", productData);
      set((prev) => ({
        products: [...prev.products, data.product],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteProduct: async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      set((prev) => ({
        products: prev.products.filter((product) => product._id !== productId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  toggleProductFeature: async (productId) => {
    try {
      const { data } = await axios.patch(`/products/${productId}`);
      set((prev) => ({
        products: prev.products.map((product) =>
          product._id == productId
            ? { ...product, isFeatured: data.product.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    try {
      set({ products: [] });
      const { data } = await axios.get("/products");
      set({ products: data.products, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      set({ products: data.products, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
