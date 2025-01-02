import { mockGames } from "@/app/mocks/data";
import { ChooseContainer } from "@/app/shared";


export default function ChooseGame() {
  return (
    <ChooseContainer buttonText="Во что поиграть?" data={mockGames} />

  );
}
