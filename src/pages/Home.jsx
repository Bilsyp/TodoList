import React, { useEffect, useState, useRef } from "react";
import Todo from "../components/Todo";
import { FaCloud } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import Check from "./Check";
import { updateItemChecked } from "../components/utils";
const Home = () => {
  const btn = useRef(null);
  const [message, setMessage] = useState("");
  const [store, setStore] = useLocalStorage("list", []);
  const [todo, setTodo] = useState(store);
  const [selected, setSelected] = useState({
    all: true,
    done: false,
  });
  const [check, setCheck] = useState(false);

  const handleSubmit = () => {
    const id = Math.random().toString(36).substring(7);
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${currentDate.getMilliseconds()} ${
      currentDate.getHours() >= 12 ? "PM" : "AM"
    }`;

    setTodo((prev) => {
      return [
        ...prev,
        {
          message,
          date: `${new Date().toDateString()} ${time}`,
          id,
          checked: false,
        },
      ];
    });
  };
  useEffect(() => {
    setStore(todo);
    // console.log();
  }, [todo]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const removeItem = (id) => {
    const pos = todo.indexOf(id);
    if (pos == -1) {
      setTodo((prev) => prev.filter((crr, index) => crr.id !== id));
    }
  };
  const handleCheck = (todos) => {
    setCheck((prevCheck) => !prevCheck);

    setTimeout(() => {
      const newArr = updateItemChecked(store, todos.id, !check);
      setTodo(newArr);
    }, 500);
  };
  const handleDone = () => {
    setSelected((prev) => {
      return {
        ...prev,
        done: true,
        all: false,
      };
    });
  };
  const handleAll = () => {
    setSelected((prev) => {
      return {
        ...prev,
        done: false,
        all: true,
      };
    });
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
      <div className="flex  justify-center w-full gap-10 items-center">
        <button onClick={handleAll} className="btn">
          All
        </button>
        <button onClick={handleDone} ref={btn} className="btn ">
          Check List
        </button>
      </div>
      <div className="flex justify-center items-center  flex-col-reverse gap-10 w-full">
        {selected.all
          ? todo.map((res) => {
              return (
                <div key={res.id} className="w-full mx-auto">
                  <Todo
                    todo={res}
                    func={{ setStore, removeItem, handleCheck }}
                  />
                </div>
              );
            })
          : null}

        {selected.done
          ? store.map((res) => {
              if (res.checked) {
                return (
                  <div key={res.id} className="w-full mx-auto">
                    <Check todo={res} />
                  </div>
                );
              }
              // return "";
            })
          : null}
      </div>
    </div>
  );
};

export default Home;
