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
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("/api/category/");
        setLoading(false);
        setData(resp?.data?.data);
        console.log("data", resp.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };
    getData();
  }, []);

  const deleteCategory = async (id) => {
    alert("clicke", id);
    try {
      const resp = await axios.delete(`/api/category/${id}`);
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
        <h2 className="text-gray-500 font-medium text-lg">Categories</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {loading && (
              <TableCell colSpan={5} className="text-center py-5">
                <Spinner size={"md"} />
              </TableCell>
            )}
            {data &&
              data.map((d, i) => {
                return (
                  <Table.Row
                    key={d._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>
                      <img src={d?.image} height={50} width={50} />
                    </Table.Cell>
                    <Table.Cell>{d?.name}</Table.Cell>
                    <Table.Cell>
                      {d?.status ? (
                        <span className="bg-green-200 rounded-[30px] py-[4px] px-2 text-green-500">
                          active
                        </span>
                      ) : (
                        <span className="bg-red-200 rounded-[30px] py-[4px] px-2 text-red-500">
                          inActive
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="flex gap-2">
                      <button onClick={() => deleteCategory(d?._id)}>
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
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
