import { auth } from "@/server/auth";
import { ChooseContainer } from "../shared";
import { cookies } from "next/headers";
import { Lang, translation } from "@/translation/translation";

export default async function ChooseGame() {

    const cookieStore = cookies();
    const lang = (await cookieStore).get("lang");

    const session = await auth();

    return (
        <div className="p-4 w-2/4 mx-auto">
            <ChooseContainer buttonText={translation[lang?.value as Lang].selectGame} category="игры" session={session} />
        </div>

    );
}
