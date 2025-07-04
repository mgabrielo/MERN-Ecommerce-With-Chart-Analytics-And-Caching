import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../config/axiosInstance";

const FeaturedPurchase = () => {
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/products/recommended");
        if (res.data) {
          setRecommendations(res.data.products);
        } else {
          setRecommendations([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecommendations();
  }, []);
  console.log({ recommendations });
  return (
    <div className="mt-5">
      <h3 className="text-2xl font-semibold">Recommended By Others</h3>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations &&
          recommendations.length > 0 &&
          recommendations.map((product, index) => (
            <ProductCard key={product._id + index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default FeaturedPurchase;
