"use server";

import { db } from "..";
import { userItems } from "../schema";
import { auth } from "../auth";
import { eq, and, desc } from "drizzle-orm";

type Genre = typeof userItems.genre.enumValues[number];
type Category = typeof userItems.category.enumValues[number];

export async function filterItems(category?: string, genre?: string, sortByLastVisited = false) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  if (category === "все" && genre === "все") {
    return await db.query.userItems.findMany({
      where: eq(userItems.userId, session.user.id),
      orderBy: sortByLastVisited ? [desc(userItems.lastVisited)] : undefined,
    });
  }

  const isCategory = userItems.category.enumValues.includes(category as Category);
  const isGenre = userItems.genre.enumValues.includes(genre as Genre);

  let whereClause;

  if (isCategory && isGenre && category !== "все" && genre !== "все") {
    whereClause = and(
      eq(userItems.category, category as Category),
      eq(userItems.genre, genre as Genre)
    );
  } else if (isCategory && category !== "все") {
    whereClause = eq(userItems.category, category as Category);
  } else if (isGenre && genre !== "все") {
    whereClause = eq(userItems.genre, genre as Genre);
  } else {
    return [];
  }

  return await db.query.userItems.findMany({
    where: whereClause,
    orderBy: sortByLastVisited ? [desc(userItems.lastVisited)] : undefined,
  });
}
