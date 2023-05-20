import React, { useEffect, useRef } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import { motion } from "framer-motion";
const Todo = ({ todo, func }) => {
  const [store, setStore] = useLocalStorage("list");
  const { removeItem, handleCheck } = func;
  const parents = useRef(null);
  const handleChecks = () => {
    handleCheck(todo);
  };
  const handleRemove = () => {
    const parent = document.getElementById(parents.current.id);

    parent.remove();

    removeItem(todo.id);
  };
  useEffect(() => {
    if (todo.checked) {
      parents.current.classList.remove("bg-gray-600");
      parents.current.classList.add("check");
    } else {
      parents.current.classList.add("bg-gray-600");
      parents.current.classList.remove("check");
    }
  });

  return (
    <motion.div
      initial={{
        opacity: "0",
        translateX: "-100%",
      }}
      animate={{
        opacity: "1",
        translateX: "0",
      }}
      drag
      id={todo.id}
      ref={parents}
      className="text-white mx-auto w-4/5 rounded-xl px-5 py-3 back bg-gray-600"
    >
      <h1 className="text-2xl font-thin break-all break-words">
        {todo.message}
      </h1>
      <div className="flex gap-5 mt-10">
        <button
          onClick={handleChecks}
          className="py-2 px-10 active:bg-cyan-700 rounded-xl bg-violet-700"
        >
          <FaCheck />
        </button>
        <button
          onClick={handleRemove}
          className="py-2 px-10 rounded-xl bg-violet-700"
        >
          <FaTimes />
        </button>
      </div>
    </motion.div>
  );
};

export default Todo;
