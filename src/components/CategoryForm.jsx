"use client";
import React, { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const CategoryForm = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post("/api/category/", data);
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
  return (
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
  );
};

export default CategoryForm;
