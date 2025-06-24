"use client";

import { login } from "@/actions/auth";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";

interface StateAction {
    status: string | null;
    message: string | null;
}

export default function LoginForm({ setStep }: { setStep: (step: number) => void }) {

    const [stateLogin, formActionLogin, pending] = useActionState<StateAction, FormData>(login, { status: null, message: null })

    useEffect(() => {
        if (stateLogin?.status === 'error') {
            toast.error(stateLogin.message, {
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
        } else if (stateLogin?.status === 'success') {
            toast.success(stateLogin.message, {
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

            setStep(2)
        }
    })

    return (
        <div className="form_container">
            <form action={formActionLogin}>
                <div className="mb-3">
                    <label className="form-label">شماره موبایل</label>
                    <input name="cellphone" type="text" className="form-control" placeholder="مثلا: 09134230685" />
                </div>
                <button disabled={pending} type="submit" className="btn btn-primary btn-auth">
                    {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                    ورود
                </button>
            </form>
        </div>
    );
}