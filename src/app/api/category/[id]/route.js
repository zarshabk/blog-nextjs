import connectionDb from "@/db/db";
import Category from "@/model/category";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectionDb(); // Ensure database connection

    const { id } = params;

    const requestData = await request.json(); // Parse JSON data

    const { name, image } = requestData; // Destructure name and image

    console.log(name, image, id);

    const cat = await Category.findById(id);
    if (!cat) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 }
      );
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        image: image,
      },
      {
        new: true,
      }
    );

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
      { error: error }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectionDb();
    //  const id = request.nextUrl.searchParams.get("id");
    const { id } = params;
    const cat = await Category.findById(id);
    if (!cat) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 }
      );
    }
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
        { error: error }
      );
    }

    return NextResponse.json(
      { message: "categor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
      { error: error }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectionDb();
    //  const id = request.nextUrl.searchParams.get("id");
    const { id } = params;
    const cat = await Category.findById(id);
    if (!cat) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: cat });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
      { error: error }
    );
  }
}
