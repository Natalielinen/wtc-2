"useClient";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const SocialButtons = () => {
    return (
        <div className="flex gap-2 justify-center w-full mt-4">
            {/* <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                variant="outline"
            >
                <Image src="/google.png" alt="Google" width={20} height={20} />
            </Button> */}
            <Button
                type="button"
                onClick={() => signIn("yandex", { callbackUrl: "/" })}
                variant="outline"
            >
                <Image src="/yandex.png" alt="Yandex" width={20} height={20} />
            </Button>
        </div>
    );
};
