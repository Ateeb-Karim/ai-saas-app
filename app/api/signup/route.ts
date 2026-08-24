import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "email already in use" },
      { status: 409 },
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  if (!hashPassword) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashPassword,
    },
  });

  if(user){
    return NextResponse.json(
      {message: "user created", user : user.id},
      {status: 201}
    )
  } else {
    return NextResponse.json(
      {message:"ERROR!"},
      {status: 500}
    )
  }
}
