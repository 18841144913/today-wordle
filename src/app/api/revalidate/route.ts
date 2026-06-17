import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getTodayDate } from "@/lib/services/wordle";

/**
 * Controller: daily refresh entry point, triggered by Vercel Cron.
 * When CRON_SECRET is set, Vercel sends it as a Bearer token automatically.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const today = getTodayDate();

  revalidateTag(`puzzle:${today}`);
  revalidatePath("/");
  revalidatePath(`/wordle/${today}`);
  revalidatePath("/archive");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated: today });
}
