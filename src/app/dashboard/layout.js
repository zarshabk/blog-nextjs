"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function layout({ children }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex gap-2">
      <Sidebar toggle={toggle} />
      <main
        className={`${toggle ? "ml-0" : "ml-[350px]"} p-5 w-full min-h-screen`}
      >
        {children}
      </main>
    </div>
  );
}
