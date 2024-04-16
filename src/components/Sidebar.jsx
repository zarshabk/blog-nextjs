import React from "react";
import Image from "next/image";
import { links } from "@/static/links";
import NavLinks from "./NavLinks";
import SideProfile from "./SideProfile";
const Sidebar = () => {
  let toggle = true;
  return (
    <div
      className={`sticky h-screen left-0 lg:w-[350px] ${
        toggle ? "block" : "hidden"
      }lg:block lg:fixed   dark:bg-gray-900 p-2 bg-white shadow`}
    >
      <SideProfile />
      <hr className="border-gray-500" />
      <div className="py-2 mb-2 px-5 flex flex-col">
        {links.map((d, index) => {
          return (
            <>
              <div key={index} className="flex flex-col w-full gap-[10px] mb-2">
                <div>
                  <h2 className="text-md text-gray-500 font-medium">
                    {d?.title}
                  </h2>
                </div>
              </div>
              {d.list.map((item, i) => {
                return <NavLinks item={item} key={i} />;
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
