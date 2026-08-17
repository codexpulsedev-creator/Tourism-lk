import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findUserById } from "@/lib/userStore";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await findUserById(session.userId);

    if (!user) {
      // Return session data directly if record lookup fallback
      return NextResponse.json({
        user: {
          id: session.userId,
          name: session.name,
          email: session.email,
          role: session.role,
        },
      });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
      },
    });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
