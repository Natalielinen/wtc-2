import { mockdata } from "@/app/mocks/data";
import { ChooseContainer } from "@/app/shared";

export default function ChooseMovie() {
  return (
    <ChooseContainer buttonText="Что посмотреть?" data={mockdata} />
  )
}



