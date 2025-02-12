import { NextResponse } from "next/server";
import { getUserId } from "@/lib/sessions";

export async function GET() {
  const userId = await getUserId();
  return NextResponse.json({ userId });
}
