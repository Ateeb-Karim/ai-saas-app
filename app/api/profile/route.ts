import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    console.log(session);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password } = await request.json();

    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 },
        );
      }
    }

    const updateFields: { name?: string; email?: string; password?: string } = {
      name,
      email,
    };

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedProfile = await prisma.user.update({
      where: { id: session.user.id },
      data: updateFields,
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
