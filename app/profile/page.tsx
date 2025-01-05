
import { ProfileForm } from "../shared";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Profile() {

    return (
        <div className="p-4 w-2/4 mx-auto">
            <p className="flex gap-2"><Link href="/">
                <MoveLeft />
            </Link> Профиль</p>

            <ProfileForm />
        </div>

    );
}
