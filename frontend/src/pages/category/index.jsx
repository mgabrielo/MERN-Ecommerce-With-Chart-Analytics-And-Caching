import React from "react";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, products } = useProductStore();

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [category]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-4">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {category && category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center pt-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No Products Found
            </h2>
          )}
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={product?._id || index} product={product} />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
