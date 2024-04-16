"use client";
import React, { useEffect, useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
const page = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.put(`/api/category/${id}`, data);
      if (resp.data) {
        toast.success(resp?.data?.message);
        setLoading(false);
        router.refresh();
        router.push("/dashboard/category");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const resp = await axios.get(`/api/category/${id}`);
        setData(resp?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [id]);

  return (
    <div className="w-full">
      <div className="h-[60px] bg-gray-100 p-2 dark:bg-gray-800 rounded-sm flex justify-between items-center">
        <h2 className="text-gray-500 text-md">Update Category</h2>
      </div>
      <div className="w-1/2 flex justify-center m-auto items-center p-5 my-5">
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
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
              name="image"
              value={data.image}
              onChange={handleChange}
              placeholder="Category image"
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div className="mt-2">
            <Button
              type="submit"
              className=""
              color={"purple"}
              isProcessing={loading}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
