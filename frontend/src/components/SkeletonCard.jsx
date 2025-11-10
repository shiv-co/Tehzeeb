import { motion } from "framer-motion";

const SkeletonCard = () => (
  <motion.div
    className="bg-white rounded-xl shadow-md p-3 mt-20 w-full max-w-xs border border-gray-200"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.2, repeat: Infinity }}
  > <div className="min-h-screen py-2 md:py-8 px-2 md:px-8">
    <h1 className="mb-2 md:mb-10"></h1>
  
    <div className="w-full h-64 bg-gray-300 rounded-md mb-3"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-300 rounded w-16"></div>
      <div className="h-4 bg-gray-300 rounded w-10"></div>
    </div>
    </div>
  </motion.div>
);

export default SkeletonCard;
