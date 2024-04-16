"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logut = () => {
  return (
    <button
      className="p-2 border-[1px] bg-transparent text-gray-500 hover:bg-green-500 hover:text-white  border-gray-500 px-5 rounded-md"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default Logut;
