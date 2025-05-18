import React from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <div className="w-full py-2 bg-[#004D43] rounded-tl-3xl rounded-tr-3xl">
      <h1 className="text-[5vw] font-[500] ml-12 text-white">BRANDS</h1>
      <div className="text border-t-2 border-b-2 border-zinc-300 flex justify-center gap-10 py-6">
        <Link to="/apple" className="text-[6.3vw] px-4 border-4 rounded-4xl border-white font-bold uppercase text-white cursor-pointer hover:bg-black ease-out">
          Apple
        </Link>
        <Link to="/samsung" className="text-[6.3vw] px-4 border-4 rounded-4xl border-white font-bold uppercase text-white cursor-pointer hover:bg-blue-500 ease-out">
          Samsung
        </Link>
        <Link to="/hp" className="text-[6.3vw] px-4 border-4 rounded-4xl border-white font-bold uppercase text-white cursor-pointer hover:bg-red-700 ease-out">
          HP
        </Link>
        <Link to="/acer" className="text-[6.3vw] px-4 border-4 rounded-4xl border-white font-bold uppercase text-white cursor-pointer hover:bg-blue-900 ease-out">
          Acer
        </Link>
      </div>
    </div>
  );
};

export default Brand;
