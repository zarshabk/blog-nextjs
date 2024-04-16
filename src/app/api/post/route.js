import Post from "@/model/post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/model/user";
import connectionDb from "@/db/db";
export async function POST(request) {
  try {
    await connectionDb();

    const { title, description, images, category_id, author_id } =
      await request.json();
    console.log(title, description, images, category_id);
    // const user = await User.findOne({ email: session?.user?.email });

    const post = await Post.findOne({ title: title });

    if (post) {
      return NextResponse.json(
        { message: "post title already exist" },
        {
          status: 400,
        }
      );
    }

    await Post.create({
      title,
      description,
      images,
      author_id,
      category_id,
    });

    return NextResponse.json(
      { message: "post created successfully" },
      {
        status: 201,
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

//get All Posts
export async function GET(request) {
  try {
    await connectionDb();
    let query = {};

    // const posts = await Post.find({})
    //   .populate({
    //     path: "category_id",
    //     select: ["name"],
    //   })
    //   .populate({
    //     path: "author_id",
    //     select: ["name", "email"],
    //   });
    const posts = await Post.find({})
      .populate({
        path: "author_id",
        select: ["email"],
      })
      .populate("category_id");
    console.log(posts);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      {
        status: 500,
      }
    );
  }
}
