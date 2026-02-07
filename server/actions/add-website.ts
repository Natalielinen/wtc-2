"use server";

import { db } from "..";
import {  userWebsites } from "../schema";
import { auth } from "../auth";
import {  Website } from "@/app/types";
import { revalidatePath } from "next/cache";


export async function addWebsite(data: Omit<Website, "userId">) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const newItem: Website = {
    ...data,
    userId: session.user.id,
  };

  await db.insert(userWebsites).values(newItem);

  revalidatePath("/");

  return { success: `Сайт ${data.name} успешно добавлен` };
}
