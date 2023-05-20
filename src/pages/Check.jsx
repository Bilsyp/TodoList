import React from "react";
import { motion } from "framer-motion";
const Check = ({ todo }) => {
  return (
    <motion.div className="rounded-xl break-all break-words mx-auto relative text-white duration-200  w-4/5 px-5 py-4  bg-gray-600">
      <h1>{todo.message}</h1>
    </motion.div>
  );
};

export default Check;
