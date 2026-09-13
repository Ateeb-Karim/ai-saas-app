import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await request.json();
    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 },
      );
    }

    const userRecord = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!userRecord) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 },
      );
    }

    const isPassword = bcrypt.compare(password, userRecord.password);
    if (!isPassword) {
      return NextResponse.json(
        { message: "password Incorrect" },
        { status: 401 },
      );
    }

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Account has been deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.log("ERROR: " + error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
