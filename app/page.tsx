import { auth } from "@/server/auth";
import { Filters, Header, ItemsList } from "./shared";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Lang, translation } from "@/translation/translation";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang");

  return {
    title: translation[lang?.value as Lang].title,
    description: translation[lang?.value as Lang].description,
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
