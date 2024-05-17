import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    const existUserbyEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existUserbyEmail) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 }
      );
    }

    const existUserbyUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existUserbyUsername) {
      return NextResponse.json(
        { user: null, message: "username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { user: newUser, mesaage: "User created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    
  }
}

export async function GET() {
  return NextResponse.json("Hii");
}
