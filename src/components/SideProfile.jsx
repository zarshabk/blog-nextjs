import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
const SideProfile = async () => {
  // const session = await useSession();
  // console.log("my session", session);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-row items-center mb-2 py-2 gap-1">
      <div className="h-[60px] w-[60px] rounded-full bg-gray-400">
        <Image
          src={
            "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
          }
          height={60}
          width={60}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="dark:text-gray-300">
          {session?.user?.name ? session?.user?.name : "zarshab"}
        </h2>
        <p className="text-sm text-gray-500">
          {session ? session?.user?.email : "zarshabrafiq1092@gmail.com"}
        </p>
      </div>
    </div>
  );
};

export default SideProfile;
