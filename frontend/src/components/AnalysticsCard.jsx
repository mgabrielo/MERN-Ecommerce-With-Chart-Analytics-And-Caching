import { motion } from "framer-motion";

const AnalysticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      className={`bg-gray-800 p-6 shadow-lg overflow-hidden relative rounded-lg ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-emerald-500 text-sm mb-1 font-semibold">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30">
        <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
          <Icon className="size-32" />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysticsCard;
