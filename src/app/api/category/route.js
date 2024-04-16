import connectionDb from "@/db/db";
import Category from "@/model/category";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { name, image } = await request.json();
    //console.log(request.json());
    await connectionDb();

    const cat = await Category.findOne({ name: name });
    console.log(cat);
    if (cat) {
      return NextResponse.json(
        { message: "Category already exist" },
        { status: 400 }
      );
    }
    await Category.create({
      name: name,
      image: image,
    });

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
      { error: error }
    );
  }
}

export async function GET(request) {
  try {
    await connectionDb();

    const id = request.nextUrl.searchParams.get("id");
    var query = {};

    if (id) {
      query = {
        _id: id,
      };
    }
    const data = await Category.find(query);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
      { error: error }
    );
  }
}

