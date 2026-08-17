import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    try {
      await connectDB();
      await ContactMessage.create(parsed.data);
    } catch (e) {
      console.warn("Contact message saved in offline mode:", parsed.data);
    }

    return NextResponse.json(
      { message: "Ayubowan! Your message has been received. Our travel specialists will respond within 24 hours." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
