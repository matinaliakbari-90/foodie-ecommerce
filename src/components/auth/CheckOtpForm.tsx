"use client";

import { checkOtp } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";

interface StateAction {
    status: string | null;
    message: string | null;
    user?: string | null;
}


export default function CheckOtpForm() {

    const [stateOtp, formActionOtp, pending] = useActionState<StateAction, FormData>(checkOtp, { status: null, message: null })
    const router = useRouter()

    useEffect(() => {
        if (stateOtp?.status === 'error') {
            toast.error(stateOtp.message, {
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
        } else if (stateOtp?.status === 'success') {
            toast.success(stateOtp.message, {
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

            router.push('/')
        }

    }, [stateOtp, router])

    return (
        <div className="form_container">
            <form action={formActionOtp}>
                <div className="mb-3">
                    <label className="form-label">کد ورود</label>
                    <input name="otp" type="text" className="form-control" />
                </div>
                <button disabled={pending} type="submit" className="btn btn-primary btn-auth">
                    {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                    تایید
                </button>
            </form>
        </div>
    );
}