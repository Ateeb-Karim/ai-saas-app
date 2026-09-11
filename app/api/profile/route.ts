import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          error: "All password fields are required",
        },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          error: "New passwords do not match",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password update error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
