import PostForm from "@/components/PostForm";

export default function page() {
  return (
    <div className="w-full">
      <div className="h-[60px] bg-gray-100 p-2 dark:bg-gray-800 rounded-sm flex justify-between items-center">
        <h2 className="text-gray-500 text-md">Create Post</h2>
      </div>
      <div className="lg:w-1/2 w-full flex justify-center m-auto items-center p-5 my-5">
        <PostForm />
      </div>
    </div>
  );
}
