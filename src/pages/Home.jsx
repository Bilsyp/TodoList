import React, { useDebugValue, useEffect, useState } from "react";
import Todo from "../components/Todo";
import { FaCloud } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
const Home = () => {
  const [message, setMessage] = useState("");
  const [store, setStore] = useLocalStorage("list", []);
  const [todo, setTodo] = useState(store);
  const [check, setCheck] = useState(false);

  const handleSubmit = () => {
    const id = Math.random().toString(36).substring(7);

    setTodo((prev) => {
      return [
        ...prev,
        {
          message,
          date: `${new Date().toDateString()}`,
          id,
          check,
        },
      ];
    });
  };
  useEffect(() => {
    setStore(todo);
  }, [todo]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleCheck = (id) => {
    setCheck(!check);
    const previousArray = [...todo];
    const updateItemChecked = (array, id, checked) => {
      const updatedArray = array.map((item) => {
        const previousItem = previousArray.find(
          (prevItem) => prevItem.id === item.id
        );
        if (item.id === id) {
          return {
            ...previousItem, // Meng-overwrite item dengan nilai dari array sebelumnya
            check: !check, // Meng-overwrite kunci 'checked' dengan nilai baru
          };
        }
        return item; // Mempertahankan item yang tidak berubah
      });
      return updatedArray;
    };
    const newArr = updateItemChecked(todo, id, check);

    setStore(newArr);
  };

  const removeItem = (id) => {
    const pos = todo.indexOf(id);
    // setStore(updateArray);
    console.log(pos);
    if (pos == -1) {
      // const updateArray = todo.filter((item, index) => index !== pos);
      setStore((prev) => prev.filter((crr, index) => crr.id !== id));
    }
    // setTodo(updateArray);
  };

  return (
    <div className="flex justify-center mt-16 items-center flex-col gap-10 p-8">
      <input
        className="outline-none w-4/5 text-white  py-2 bg-transparent border-b-2 border-cyan-800"
        onChange={handleChange}
      />
      <button
        className=" w-44  px-10 py-2  flex justify-center items-center gap-x-5  active:bg-violet-200 rounded-xl bg-violet-700 text-white font-semibold"
        onClick={handleSubmit}
      >
        Send <FaCloud />
      </button>
      <div className="flex flexp-col justify-center w-full gap-10 items-center flex-col-reverse">
        {todo == null ? (
          ""
        ) : todo == undefined ? (
          <h1>Hhaahah</h1>
        ) : (
          todo.map((res) => (
            <Todo
              remove={{ removeItem, setStore, handleCheck, check }}
              key={res.id}
              todo={res}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
