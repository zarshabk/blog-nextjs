"use client";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { set } from "mongoose";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function page() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    setLoading(true);
    try {
      const resp = await signIn("credentials", {
        email: user.email,
        password: user.password,
      });
      if (resp?.error) {
        setError(resp?.error);
        setLoading(false);
      }
      setError("");
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-[80vh] flex justify-center items-center w-full shadow">
      <div className="w-1/3 dark:bg-slate-800 shadow bg-white">
        <div className="h-[120px] bg-gray-100 dark:bg-slate-900 p-5 py-10">
          <h1 className="text-2xl  dark:text-white">Login To Continue</h1>
        </div>
        <form className="m-3" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              name="email"
              value={user.email}
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
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="password"
              required
              className="bg-transparent"
              shadow
            />
          </div>
          <div className="my-2">
            <Button type="submit" color={"purple"} isProcessing={loading}>
              login
            </Button>
          </div>
          {error && <p className="my-2 text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
