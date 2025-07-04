import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, UserPlus } from "lucide-react";
import { categories } from "../pages/home";
import { useUserStore } from "../store/useUserStore";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
const CreateProductForm = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { loading, createProduct } = useProductStore();
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(imageFile); //base64-format
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = newProduct;

      console.log(data);
      await createProduct(data);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ newProduct });
  return (
    <motion.div className="bg-gray-800 shadow-lg p-8 rounded-lg  mb-8 max-w-xl m-auto">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <div className="mt-1 relative rounded-md-sm">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter Your Product Name"
              className={`block w-full px-3 py-2 pl-5 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="description"
          >
            Product Description
          </label>
          <div className="mt-1 relative rounded-md-sm">
            <textarea
              id="description"
              name="description"
              type="text"
              required
              rows={3}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter Your Product Descriptiom"
              className={`block w-full px-3 py-2 pl-5 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="price"
          >
            Product Price
          </label>
          <div className="mt-1 relative rounded-md-sm">
            <input
              id="price"
              name="price"
              type="number"
              required
              step={0.01}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="Enter Your Product Name"
              className={`block w-full px-3 py-2 pl-5 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="category"
          >
            Product Category
          </label>
          <div className="mt-1 relative rounded-md-sm">
            <select
              id="category"
              name="category"
              required
              value={newProduct.catgeory}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="Enter Your Product Name"
              className={`block w-full px-3 py-2 pl-5 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
            >
              <option value=""> Select a Category</option>
              {categories.map((category, index) => (
                <option
                  className="text-white font-medium"
                  value={category.name}
                  key={index}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="image"
          >
            <Upload className="size-5 mr-2 inline-block" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm mb-2  text-gray-400">
              - Image Uploaded -
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                                          text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none
                                          focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="animate-spin size-5 mr-2" aria-hidden="true" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="size-5 mr-2" aria-hidden="true" />
              Create
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
