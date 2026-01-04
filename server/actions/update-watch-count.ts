"use server";

import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";

export async function updateWatchCount(itemId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  if (!itemId) {
    throw new Error("Item id is required");
  }

  await db
    .update(userItems)
    .set({
      watchCount: sql`${userItems.watchCount} + 1`,
    })
    .where(eq(userItems.id, itemId));

  revalidatePath("/");

  return { success: "watchCount успешно обновлён" };
}
