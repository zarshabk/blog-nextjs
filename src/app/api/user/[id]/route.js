import connectionDb from "@/db/db";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await User.findById({ _id: id });

    return NextResponse.json({ user });
  } catch (error) {
    return NextRes;
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const user = await User.findByIdAndDelete({ _id: id });

    return NextResponse.json(
      { message: "user deleted" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectionDb();
    const { id } = params;
    console.log(id);
    const { status } = await request.json();
    console.log(status, id);
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        status: status === "active" ? "inactive" : "active",
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      { message: "user updated", user },

      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      {
        status: 500,
      }
    );
  }
}
