
import { Lang, translation } from "@/translation/translation";
import { ProfileForm } from "../shared";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Profile() {

    const cookieStore = cookies();
    const lang = (await cookieStore).get("lang");

    return (
        <div className="p-4 w-2/4 mx-auto">
            <p className="flex gap-2"><Link href="/">
                <MoveLeft />
            </Link> {translation[lang?.value as Lang].profile}</p>

            <ProfileForm />
        </div>

    );
}
