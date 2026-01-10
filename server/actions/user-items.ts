"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { userItems, users } from "../schema";

export async function getUserItems(userId?: string) {
  if (!userId) {
    return [];
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return [];
  }

  const items = await db.query.userItems.findMany({
    where: eq(userItems.userId, userId),
    orderBy: [desc(userItems.createdAt)],
  });

  return items;
}
