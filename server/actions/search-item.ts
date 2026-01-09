'use server';

import { and, eq, ilike } from "drizzle-orm";
import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";

export async function searchItem(searchQuery: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const items = await db.query.userItems.findMany({
    where: and(
      eq(userItems.userId, session.user.id),
      ilike(userItems.name, `%${searchQuery.trim()}%`)
    ),
  });

  return items ;
}
