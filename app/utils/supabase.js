import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

export default supabase;
