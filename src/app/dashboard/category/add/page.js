import CategoryForm from "@/components/CategoryForm";
import { TextInput, Label, Button } from "flowbite-react";

export default function page() {
  return (
    <div className="w-full">
      <div className="h-[60px] bg-gray-100 p-2 dark:bg-gray-800 rounded-sm flex justify-between items-center">
        <h2 className="text-gray-500 text-md">Add Category</h2>
      </div>
      <div className="w-1/2 flex justify-center m-auto items-center p-5 my-5">
        <CategoryForm />
      </div>
    </div>
  );
}
