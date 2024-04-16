"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function page() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post("/api/register", data);
      if (resp?.data) {
        toast.success(resp?.data?.message);
        router.push("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="h-[80vh] flex justify-center items-center w-full shadow">
      <div className="w-1/3 dark:bg-slate-800 shadow bg-white">
        <div className="h-[120px] bg-gray-100 dark:bg-slate-900 p-5 py-10">
          <h1 className="text-2xl  dark:text-white">Register To Continue</h1>
        </div>
        <form className="m-3" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="bg-transparent focus:bg-transparent"
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div className="my-2">
            <Button
              type="submit"
              color={"purple"}
              isProcessing={loading}
              disabled={loading}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
