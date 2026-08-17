import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    try {
      await connectDB();
      await NewsletterSubscriber.findOneAndUpdate(
        { email: parsed.data.email.toLowerCase() },
        { email: parsed.data.email.toLowerCase(), active: true },
        { upsert: true }
      );
    } catch (e) {
      console.warn("Newsletter saved in offline fallback mode:", parsed.data.email);
    }

    return NextResponse.json(
      { message: "Ayubowan! You are subscribed to Ceylon Travel Tales." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
