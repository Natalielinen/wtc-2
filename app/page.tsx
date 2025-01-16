import { mockdata, mockGames } from "./mocks/data";
import { Filters, Header, ItemsList } from "./shared";

export default async function Home() {

  return (
    <div className="p-4">
      <Header />
      <Filters />
      <ItemsList data={[...mockdata, ...mockGames]} />
    </div>

  );
}
