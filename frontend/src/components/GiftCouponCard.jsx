import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useEffect } from "react";

const GiftCouponCard = () => {
  const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } =
    useCartStore();
  const [userInputCode, setUserInputCode] = useState("");

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    console.log({ userInputCode });
    try {
      if (!userInputCode) {
        return;
      }
      await applyCoupon(userInputCode);
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartCoupon = async (e) => {
    e.preventDefault();
    try {
      await removeCoupon();
      setUserInputCode("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyCoupon();
  }, []);
  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);
  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Do You Have A Voucher or Gift Card ?
          </label>
          <input
            type="text"
            id="voucher"
            className={`block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white
                      placeholder-gray-400 focus:border-emerald-600 focus:ring-emerald-600`}
            placeholder="Enter Coupon Code"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>
        <motion.button
          className={`flex w-full items-center justify-center rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium
                              text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400`}
          whileHover={{ scale: 1.05 }}
          whileTop={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          <p>Apply Code</p>
        </motion.button>
      </div>
      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg medium text-gray-300">Applied Coupon</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            className={`flex w-full items-center justify-center rounded-lg bg-red-500 px-5 py-2 text-sm font-medium
                              text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400`}
            whileHover={{ scale: 1.05 }}
            whileTop={{ scale: 0.95 }}
            onClick={removeCartCoupon}
          >
            <p>Remove Coupon</p>
          </motion.button>
        </div>
      )}
      {coupon && (
        <div className="mt-4">
          <h3 className="text-lg medium text-gray-300">
            Your Available Coupon:
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
