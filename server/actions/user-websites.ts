"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { userWebsites, users } from "../schema";

export async function getUserWebsites(userId?: string) {
  if (!userId) {
    return [];
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return [];
  }

  const items = await db.query.userWebsites.findMany({
    where: eq(userWebsites.userId, userId),
    orderBy: [desc(userWebsites.createdAt)],
  });

  return items;
}
