import connectionDb from "@/db/db";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionDb();
    const { username, email, password } = await request.json();

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { message: "invalid crdentials" },
        { status: 403 }
      );
    }

    const pass = bcrypt.hashSync(password);

    await User.create({
      username,
      email,
      password: pass,
    });
    return NextResponse.json(
      { message: "Your account has been created" },
      { status: 201 }
    );
  } catch (error) {}
}
