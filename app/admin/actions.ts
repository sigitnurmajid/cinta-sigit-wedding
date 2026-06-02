"use server";

import { revalidatePath } from "next/cache";
import { setApproved, deleteRsvp } from "@/lib/db";

// These server actions are reachable only through /admin, which is guarded by
// middleware.ts (Basic Auth).

export async function approveAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const approved = formData.get("approved") === "1";
  if (id) setApproved(id, approved);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (id) deleteRsvp(id);
  revalidatePath("/admin");
  revalidatePath("/");
}
