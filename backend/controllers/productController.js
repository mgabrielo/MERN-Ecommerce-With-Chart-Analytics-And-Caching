import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";
import redisClient from "../utils/redis.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redisClient.get("featured_products");
    if (featuredProducts) {
      return res.json({ featuredProducts: JSON.parse(featuredProducts) });
    }
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      res.status(404).json({ message: "no featured products found" });
    }

    await redisClient.set(
      "featured_products",
      JSON.stringify(featuredProducts)
    );
    res.json({ featuredProducts });
  } catch (error) {
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      const product = await Product.create({
        name,
        description,
        category,
        price: Number(price),
        image: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : "",
      });

      res.status(201).json({ product });
    } else {
      res.status(404).json({ message: "product image not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("image deleted from cloudinary");
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).json({ message: "Product Image not found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product delete success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    console.log({ cat_products: products });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    console.log(error);

    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeatureProductCache();
      res.status(200).json({ product: updatedProduct });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: `server-error : ${error?.message}` });
  }
};

async function updateFeatureProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redisClient.set(
      "featured_products",
      JSON.stringify(featuredProducts)
    );
  } catch (error) {
    console.log(error);
  }
}
