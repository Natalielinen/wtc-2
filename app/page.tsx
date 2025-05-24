import getPosts from "@/server/actions/get-posts";
import { Filters, Header, ItemsList } from "./shared";

export default async function Home() {

  const data = await getPosts();

  console.log('data', data);

  return (
    <div className="p-4">
      <Header />
      <Filters />
      <ItemsList />
    </div>

  );
}
