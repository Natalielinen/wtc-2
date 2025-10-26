"use server";

import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";


export async function deleteItem(itemId: string, itemName: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

 if(!itemId) {
    throw new Error("Item id is required");
  }

  if(itemId) {
    await db.delete(userItems).where(eq(userItems.id, itemId));
  }

  revalidatePath("/");

  return { success: `Элемент ${itemName} успешно удален` };
}
