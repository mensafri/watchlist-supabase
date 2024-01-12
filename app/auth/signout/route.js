import { NextResponse } from "next/server";
import supabase from "../../utils/supabase";

export async function POST(req) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url, { status: 302 }));
}
