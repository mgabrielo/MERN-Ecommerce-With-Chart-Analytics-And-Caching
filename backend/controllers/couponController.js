import Coupon from "../models/Coupon.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.json({ coupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ error: "cannot find coupon" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ error: "coupon expired" });
    }
    res.status(200).json({
      message: "Valid Coupon Added Successfully",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};
