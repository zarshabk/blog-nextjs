import Post from "@/model/post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/model/user";
import connectionDb from "@/db/db";

export async function DELETE(request, { params }) {
  try {
    await connectionDb();
    const { id } = params;

    const post = await Post.findByIdAndDelete({ _id: id });
    return NextResponse.json(
      { message: "post deleted" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      {
        status: 500,
      }
    );
  }
}
