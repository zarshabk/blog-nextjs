"use client";
import Link from "next/link";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { getServerSession } from "next-auth";
import Logut from "./Logut";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const Header = () => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <div className="h-[80px] bg-white dark:bg-slate-900 w-full flex justify-center items-center backdrop-blur-md shadow">
      <div
        className={`container mx-auto ${
          path.startsWith("/dashboard") ? "w-[98%]" : "lg:w-[80%]"
        }  w-[98%] flex items-center justify-between`}
      >
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-2xl p-2 dark:text-slate-300">
            Next Blog
          </h1>
          <div className="flex gap-2 mt-1">
            <Link href={"#"} className="p-2 font-medium dark:text-gray-500">
              Home
            </Link>
            <Link href={"#"} className="p-2 font-medium dark:text-gray-500">
              Categories
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {session === null && (
            <>
              <Link
                className="p-2 border-[1px] bg-transparent text-gray-500 hover:bg-green-500 hover:text-white  border-gray-500 px-5 rounded-md"
                href={"/login"}
              >
                Login
              </Link>
              <Link
                className="p-2 border-[1px] bg-transparent text-gray-500 hover:bg-green-500 hover:text-white  border-gray-500 px-5 rounded-md"
                href={"/register"}
              >
                Register
              </Link>
            </>
          )}
          {session !== null && (
            <>
              <Logut />
            </>
          )}
          <DarkThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
