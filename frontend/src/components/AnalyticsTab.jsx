import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import AnalysticsCard from "./AnalysticsCard";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);
  console.log({ dailySalesData });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalysticsCard
          title={"Total Users"}
          value={analyticsData.users?.toLocaleString()}
          icon={Users}
          color={"from-emerald-500 to-teal-700"}
        />
        <AnalysticsCard
          title={"Total Products"}
          value={analyticsData.products?.toLocaleString()}
          icon={Package}
          color={"from-emerald-500 to-green-700"}
        />
        <AnalysticsCard
          title={"Total Products"}
          value={analyticsData.totalSales?.toLocaleString()}
          icon={ShoppingCart}
          color={"from-emerald-500 to-cyan-700"}
        />
        <AnalysticsCard
          title={"Total Revenue"}
          value={`$${analyticsData.totalRevenue?.toLocaleString()}`}
          icon={DollarSign}
          color={"from-emerald-500 to-lime-700"}
        />
      </div>
      <motion.div
        className="bg-gray-800/60 rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"date"} stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId={"left"}
              type="monotone"
              dataKey="sales"
              activeDot={{ r: 8 }}
              stroke="#10B981"
              name="Sales"
            />
            <Line
              yAxisId={"right"}
              type="monotone"
              dataKey="revenue"
              activeDot={{ r: 8 }}
              stroke="#3B82F6"
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;
