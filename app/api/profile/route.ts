import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (existingUser && existingUser.email === session.user.email) {
      return NextResponse.json(
        { error: "email already exist" },
        { status: 409 },
      );
    }

    const { name, email } = await request.json();

    const updatedProfile = await prisma.user.update({
      where: { id: session.user.id as string },
      data: { name, email },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
