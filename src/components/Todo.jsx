import React, { useRef, useState } from "react";
import { FaTimes, FaCheck, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import useLocalStorage from "use-local-storage";
function Todo({ todo, remove }) {
  const { removeItem, handleCheck } = remove;
  const [check, setCheck] = useLocalStorage("list");
  const matches = check.filter((item) => item.id == todo.id)[0];

  const [final, setFinal] = useState(matches);
  const parent = useRef(null);
  const handleDelete = (id) => {
    removeItem(id);

    const parents = parent.current;
    setTimeout(() => {
      parents.remove();
    }, 1500);
  };
  const handleChecks = (id) => {
    setFinal(!final);
    setTimeout(() => {
      handleCheck(id);
    }, 2000);
    // console.log(check);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateX: "-100%",
      }}
      drag
      animate={{
        opacity: 1,
        translateX: "0",
      }}
      ref={parent}
      className="rounded-xl relative text-white duration-200  w-4/5 px-5 py-4  bg-gray-600"
    >
      <h1 className={final ? "underline" : "no-underline"}>{todo.message}</h1>

      <p className=" max-w-xl break-words break-all">{todo.date}</p>
      <div className="flex  justify-end mt-10 items-center gap-8">
        <button
          onClick={() => handleDelete(todo.id)}
          className="active:bg-red-200 bg-red-600 rounded-lg px-10 py-2 text-white font-semibold"
        >
          <FaTimes />
        </button>
        <button
          onClick={() => handleChecks(todo.id)}
          className="active:bg-emerald-200  bg-emerald-500 rounded-lg px-10 py-2 text-white font-semibold"
        >
          <FaCheck />
        </button>
      </div>

      <button className="absolute  top-5 right-4 text-xl text-white cursor-pointer">
        <FaCopy />
      </button>
    </motion.div>
  );
}

export default Todo;
