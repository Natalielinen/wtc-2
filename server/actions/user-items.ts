"use server";


import { eq } from "drizzle-orm";
import { db } from "..";
import { userItems, users } from "../schema";

export async function getUserItems(userId: string) {
  // сначала проверим, есть ли такой пользователь
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  // вариант 1: напрямую из таблицы
  const items = await db.query.userItems.findMany({
    where: eq(userItems.userId, userId),
  });

  return items;

  // вариант 2 (через relations):
  // const userWithItems = await db.query.users.findFirst({
  //   where: eq(users.id, userId),
  //   with: { items: true },
  // });
  // return userWithItems?.items ?? [];
}
