"use client";

import { resendOtp } from "@/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";

interface StateAction {
    status: string | null;
    message: string | null;
}


export default function ResendOtpForm() {

    const [stateResend, formActionResend, pending] = useActionState<StateAction>(resendOtp, { status: null, message: null })

    const [seconds, setSeconds] = useState(30);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        if (stateResend?.status === 'error') {
            toast.error(stateResend.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                rtl: true
            })
        } else if (stateResend?.status === 'success') {
            toast.success(stateResend.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                rtl: true
            })

            setSeconds(15);
            setMinutes(1);
        }
    }, [stateResend])


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            }

        }, 1000);

        return () => clearInterval(interval)
    })

    return (
        <div className="resend-otp-button">
            {seconds > 0 || minutes > 0 ? (
                <div className="mb-1 me-3">
                    {seconds < 10 ? `0${seconds}` : seconds} :
                    {minutes < 10 ? `0${minutes}` : minutes}
                </div>
            ) : (
                <form action={formActionResend}>
                    <button disabled={pending} className="btn btn-dark px-3 py-2">
                        {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                        ارسال مجدد کد
                    </button>
                </form>
            )}
        </div>
    );
}