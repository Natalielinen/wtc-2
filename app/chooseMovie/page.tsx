import { auth } from "@/server/auth";
import { ChooseContainer } from "../shared";

export default async function ChooseMovie() {

    const session = await auth();

    return (
        <div className="p-4 w-2/4 mx-auto">
            <ChooseContainer buttonText="Выбрать фильм" category="фильмы" session={session} />
        </div>

    );
}
