'use client';

import { newVerification } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const EmailVerificationForm = () => {

    const token = useSearchParams().get('token');
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVerification = useCallback(async () => {
        if (success || error) {
            return;
        }

        if (!token) {
            setError('Token not found');
            return;
        }

        newVerification(token).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            if (data.success) {
                setSuccess(data.success);
                router.push('/');
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div>{!success && !error && <p>Verifiing email...</p>}</div>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}