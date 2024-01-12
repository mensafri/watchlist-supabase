import { NextResponse } from "next/server";
import supabase from "../../utils/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/watch-list", req.url));
}
