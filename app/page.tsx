import { mockdata, mockGames } from "./mocks/data";
import { Filters, Header, ItemsList } from "./shared";

export default async function Home() {

  // const fetchItems = async () => {
  //   const res = await fetch('/api/items', { method: 'GET' });
  //   const items = await res.json();
  //   return items;

  // }
  // const items = await fetchItems();

  // console.log('items', items);


  return (
    <div className="p-4">
      <Header />
      <Filters />
      <ItemsList data={[...mockdata, ...mockGames]} />
    </div>

  );
}
