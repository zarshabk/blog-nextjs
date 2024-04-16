"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLinks = ({ item }) => {
  const pathname = usePathname();
  console.log("pathname is", pathname);
  return (
    <Link
      href={item?.path}
      className={`text-gray-500 text-sm mb-1 ml-1 ${
        pathname === item?.path
          ? "dark:bg-blue-500 dark:text-white bg-gray-100"
          : "dark:hover:bg-gray-800 hover:bg-gray-100"
      } rounded-md`}
    >
      <div className="flex flex-row gap-2 items-center p-1 my-2">
        <span>{item?.icon}</span>
        <span>{item?.text}</span>
      </div>
    </Link>
  );
};

export default NavLinks;
