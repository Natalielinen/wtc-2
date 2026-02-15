import { auth } from "@/server/auth";
import { Filters, Header, ItemsList } from "./shared";

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
