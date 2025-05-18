import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Marquee = () => {
  return (
    <div className="w-full py-2 bg-[#004D43] rounded-tl-3xl rounded-tr-3xl">
      <h1 className="text-[5vw] font-[500]">CATEGORIES</h1>
      <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap pb-22 overflow-hidden gap-10">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-120%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
          className="text-[7vw] leading-none font-bold uppercase -mb-[7vw] pb-3 flex gap-10"
        >
          <Link to="/gaming">
            <span className="cursor-pointer hover:text-gray-400">gaming</span>
          </Link>
          <Link to="/business">
            <span className="cursor-pointer hover:text-green-500">business</span>
          </Link>
          <Link to="/student">
            <span className="cursor-pointer hover:text-blue-400">student</span>
          </Link>
          <Link to="/budget">
            <span className="cursor-pointer hover:text-pink-400">BudgetPick</span>
          </Link>
        </motion.h1>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-120%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
          className="text-[7vw] leading-none font-bold uppercase -mb-[7vw] pb-3 flex gap-10"
        >
          <Link to="/gaming">
            <span className="cursor-pointer hover:text-gray-400">gaming</span>
          </Link>
          <Link to="/business">
            <span className="cursor-pointer hover:text-green-500">business</span>
          </Link>
          <Link to="/student">
            <span className="cursor-pointer hover:text-blue-400">student</span>
          </Link>
          <Link to="/budget">
            <span className="cursor-pointer hover:text-pink-400">BudgetPick</span>
          </Link>
        </motion.h1>
      </div>
    </div>
  );
};

export default Marquee;
