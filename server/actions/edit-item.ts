"use server";

import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";
import { Item } from "@/app/types";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function editItem(data: Omit<Item, "userId" | "lastVisited">) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  if (!data.id) {
    throw new Error("Item id is required");
  }

  if (data?.id) {
    await db.update(userItems).set(data).where(eq(userItems.id, data.id));
  }

  revalidatePath("/");

  return { success: `${data.category} ${data.name} успешно обновлен` };
}
