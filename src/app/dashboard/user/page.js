"use client";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const updateStatus = (id, st) => {
    console.log(st);
    try {
      const resp = axios.put(`/api/user/${id}`, { status: st });
      if (resp?.data) {
        const d = data.map((user, i) => {
          if (user._id === id) {
            user.status = resp?.data?.user?.status;
          }
        });
        setData([...data, d]);
        toast.success(resp?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("/api/user/");
        setLoading(false);
        setData(resp?.data?.users);
        console.log("data", resp.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };
    getData();
  }, []);
  const deleteUser = async (id) => {
    alert("clicke", id);
    try {
      const resp = await axios.delete(`/api/user/${id}`);
      if (resp?.data) {
        const d = data.filter((item) => item?._id !== id);
        setData(d);
        toast.success(resp?.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full flex flex-col dark:bg-gray-800 p-5 shadow bg-white">
      <div className="my-3">
        <h2 className="text-gray-500 font-medium text-lg">All Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table
          className="w-full bg-inherit dark:text-gray-500 p-5 text-center"
          cellPadding={5}
          cellSpacing={5}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((d, i) => {
                return (
                  <tr className="p-5 border-b-[1px]">
                    <td>{i + 1}</td>

                    <td>{d?.username}</td>
                    <td>{d?.email}</td>
                    <td>
                      {" "}
                      <ToggleSwitch
                        checked={d?.status === "active" ? true : false}
                        value={d?.status}
                        onClick={() => updateStatus(d?._id, d?.status)}
                      />
                    </td>
                    <td className="flex gap-2">
                      <button onClick={() => deleteUser(d?._id)}>
                        <AiOutlineDelete
                          size={25}
                          className="text-red-400 hover:scale-[1.1]"
                        />
                      </button>
                      <Link href={`/dashboard/category/${d?._id}`}>
                        <AiOutlineEdit
                          size={25}
                          className="text-green-500 hover:scale-[1.1]"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
