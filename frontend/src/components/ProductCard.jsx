import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleProductToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Login to Add Product to Cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-md">
      <div className="relative mt-3 mx-3 flex h-60 overflow-hidden rounded-xl">
        {product?.image && (
          <img
            className="object-cover w-full"
            src={product.image}
            alt="product-image"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          onClick={handleProductToCart}
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm"
        >
          Add To Cart
          <ShoppingCart className="size-5 ml-3" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
