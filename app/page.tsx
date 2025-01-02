import { mockdata, mockGames } from "./mocks/data";
import { Filters, Header, Preview } from "./shared";

export default function Home() {
  return (
    <div className="p-4">
      <Header />
      <Filters />
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
          [...mockdata, ...mockGames].map((item) => (
            <Preview key={item.id} item={item} />
          ))
        }
      </div>
    </div>

  );
}
