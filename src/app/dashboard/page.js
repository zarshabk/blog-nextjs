"use client";
import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";

export default function page() {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <Suspense fallback={<h1>loading,....</h1>}>
        <div className="w-full rounded-lg bg-white shadow h-[150px] dark:bg-gray-800 dark:text-gray-500 p-10">
          <h1 className="font-medium text-4xl">
            Welcome <span className="font-bold">{session?.user?.username}</span>
          </h1>
          <p className="font-medium text-lg text-gray-500 tracking-[3px]">
            {session?.user?.email}
          </p>
        </div>
      </Suspense>
    </div>
  );
}
