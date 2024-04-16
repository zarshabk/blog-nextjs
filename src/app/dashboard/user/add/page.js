import { TextInput, Label, Button } from "flowbite-react";

export default function page() {
  return (
    <div className="w-full">
      <div className="h-[60px] bg-gray-100 p-2 dark:bg-gray-800 rounded-sm flex justify-between items-center">
        <h2 className="text-gray-500 text-md">Add Category</h2>
      </div>
      <div className="w-1/2 flex justify-center m-auto items-center p-5 my-5">
        <form className="w-full flex flex-col gap-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Category Name"
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block ">
              <Label htmlFor="image" value="Image Url" />
            </div>
            <TextInput
              id="image"
              type="text"
              placeholder="Category image"
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div className="mt-2">
            <Button className="" color={"purple"}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
