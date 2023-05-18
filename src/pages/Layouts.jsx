import React from "react";
import { Link } from "react-router-dom";
const Layouts = ({ chidlren }) => {
  return (
    <>
      <nav className="bg-slate-800 text-white py-4">
        <ul className="flex justify-center items-center gap-9">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/Blogs"}>Blogs</Link>
          </li>
        </ul>
      </nav>

      {chidlren}
    </>
  );
};

export default Layouts;
