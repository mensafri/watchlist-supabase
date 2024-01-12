"use server";
import { revalidatePath } from "next/cache";
import supabase from "../utils/supabase";

export default async function updateWatch(formData) {
  const id = formData.get("id");
  const model = formData.get("model");
  const brand = formData.get("brand");
  const referenceNumber = formData.get("referenceNumber");

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not authenticated within updateWatch server action");
    return;
  }

  const { error } = await supabase
    .from("watches")
    .update({
      model,
      brand,
      reference_number: referenceNumber,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error editing data: ", error);
    return;
  }

  revalidatePath("/watch-list");

  return { message: "Success" };
}
