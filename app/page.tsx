import { auth } from "@/server/auth";
import { Filters, Header, ItemsList } from "./shared";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang");

  const titles: Record<string, string> = {
    ru: "Что посмотреть?",
    en: "What to watch?",
  };

  const descriptions: Record<string, string> = {
    ru: "Персональная библиотека фильмов и игр",
    en: "Personal library of movies and games",
  };

  return {
    title: titles[lang?.value || "ru"],
    description: descriptions[lang?.value || "ru"],
    alternates: {
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
  };
}

export default async function Home() {
  const session = await auth();

  return (
    <div className="p-4">
      <Header session={session} />
      {session && <Filters />}

      <ItemsList session={session} />
    </div>
  );
}
