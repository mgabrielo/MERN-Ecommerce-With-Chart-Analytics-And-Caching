import CategoryItem from "../../components/CategoryItem";

export const categories = [
  { href: "/tv", name: "tv", imageUrl: "/tv.jpg" },
  { href: "/laptop", name: "laptops", imageUrl: "/laptop.jpg" },
  { href: "/mouse", name: "mouse", imageUrl: "/mouse.jpg" },
  { href: "/gaming", name: "gaming", imageUrl: "/gaming.jpg" },
  { href: "/headphones", name: "headphones", imageUrl: "/headphones.jpg" },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-500 mb-4">
          Explore More Catgories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in technology
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories &&
            categories.length &&
            categories.map((category) => (
              <CategoryItem key={category.name} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
