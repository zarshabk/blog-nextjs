import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const users = await User.find({});

    return NextResponse.json({ users });
  } catch (error) {
    return NextRes;
  }
}
