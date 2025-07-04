import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAnalytics = async (req, res) => {
  try {
    /* numerical analytics */
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null, // groups documents under the same group
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);
    const { totalSales, totalRevenue } = salesData[0] || {
      totalSales: 0,
      totalRevenue: 0,
    };
    let analyticsData = {
      users: totalUsers,
      products: totalProducts,
      totalSales,
      totalRevenue,
    };
    /* numerical analytics */

    /* chart analytics */
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    let dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const datesArray = getDatesArray(startDate, endDate);
    dailySalesData = datesArray.map((date) => {
      const foundData = dailySalesData?.find((data) => data._id == date);
      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });

    res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

function getDatesArray(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
