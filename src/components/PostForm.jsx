"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import { TextInput, Label, Button, Select, Textarea } from "flowbite-react";
import toast from "react-hot-toast";
import { set } from "mongoose";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const PostForm = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    category_id: "",
    images: "",
  });
  const { data: session } = useSession();
  const [cat, setCat] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getCat = async () => {
      try {
        const resp = await axios.get("/api/category/");
        console.log(resp?.data);
        if (resp?.data) {
          setCat(resp?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post("/api/post/", {
        ...data,
        author_id: session.user.id,
      });
      if (resp?.data) {
        toast.success(resp?.data?.message);
        setLoading(false);
        setData({
          title: "",
          description: "",
          category_id: "",
          images: "",
        });
        router.refresh();
        router.push("/dashboard/post");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Post Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="title"
          name="title"
          value={data.title}
          onChange={handleChange}
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
          name="images"
          placeholder="post image"
          value={data.images}
          onChange={handleChange}
          required
          className="bg-transparent"
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="image" value="Category" />
        </div>
        <Select
          id="image"
          type="text"
          name="category_id"
          value={data?.category_id}
          onChange={handleChange}
          required
          className="bg-transparent"
          shadow
        >
          <option value={""} selected disabled>
            --select category--
          </option>
          {cat &&
            cat?.map((d, i) => {
              return <option value={d._id}>{d?.name}</option>;
            })}
        </Select>
      </div>
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="image" value="Description" />
        </div>
        <Textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
        ></Textarea>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          className=""
          isProcessing={loading}
          disabled={loading}
          color={"purple"}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
