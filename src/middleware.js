import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log(request.nextUrl);
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === "/" || path === "/login" || path === "/register";
  console.log("token from middleware", token);
  //   const user = await User.findById({ _id: id });

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/register", "/login", "/dashboard"],
};
