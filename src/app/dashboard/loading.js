import { Button, Spinner } from "flowbite-react";
export default function loading() {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Spinner size={"lg"} />
    </div>
  );
}
