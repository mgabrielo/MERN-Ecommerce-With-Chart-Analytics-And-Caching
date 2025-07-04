import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, ShoppingBasket, BarChart } from "lucide-react";
import CreateProductForm from "../../components/CreateProductForm";
import ProductList from "../../components/ProductList";
import AnalyticsTab from "../../components/AnalyticsTab";
import { useProductStore } from "../../store/useProductStore";
const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];
const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16 mt-10">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200
                            ${
                              activeTab == tab.id
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-700 text-white hover:bg-gray-600"
                            }
                            `}
            >
              <tab.icon className="size-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab == "create" && <CreateProductForm />}
        {activeTab == "products" && <ProductList />}
        {activeTab == "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminDashBoard;
