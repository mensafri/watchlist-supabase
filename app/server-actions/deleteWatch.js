"use server";
import { revalidatePath } from "next/cache";
import supabase from "../utils/supabase";

export default async function deleteWatch(formData) {
  const watchId = formData.get("id");

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not authenticated within deleteWatch server action");
    return;
  }

  const { error } = await supabase
    .from("watches")
    .delete()
    .match({ id: watchId, user_id: user.id });

  if (error) {
    console.error("Error deleting data: ", error);
    return;
  }

  revalidatePath("/watch-list");

  return { message: "Success" };
}
