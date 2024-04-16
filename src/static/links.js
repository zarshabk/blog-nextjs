import {
  AiOutlineFile,
  AiOutlineFileAdd,
  AiOutlineFileDone,
  AiOutlineFileImage,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

export const links = [
  {
    id: 1,
    title: "User",
    list: [
      {
        text: "manage users",
        path: "/dashboard/user",
        icon: <AiOutlineUsergroupAdd size={"20"} />,
      },

      {
        text: "Add User",
        path: "/dashboard/user/add",
        icon: <AiOutlineUserAdd size={"20"} />,
      },
    ],
  },
  {
    id: 2,
    title: "Post",
    list: [
      {
        text: "manage posts",
        path: "/dashboard/post",
        icon: <AiOutlineFile size={"20"} />,
      },
      {
        text: "Add post",
        path: "/dashboard/post/add",
        icon: <AiOutlineFileAdd size={"20"} />,
      },
    ],
  },
  {
    id: 3,
    title: "Category",
    list: [
      {
        text: "manage categories",
        path: "/dashboard/category",
        icon: <AiOutlineFileImage size={"20"} />,
      },
      {
        text: "Add Category",
        path: "/dashboard/category/add",
        icon: <AiOutlineFileDone size={"20"} />,
      },
    ],
  },
];
