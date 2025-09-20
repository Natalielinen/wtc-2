"use server";

import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";
import { Item } from "@/app/types";
import { revalidatePath } from "next/cache";


export async function addItem(data: Omit<Item, "userId" | "lastVisited">) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const newItem: Item = {
    ...data,
    userId: session.user.id,
  };

  await db.insert(userItems).values(newItem);

  revalidatePath("/");

  return { success: `${data.category} ${data.name} успешно добавлен` };
}
