"use client";

import { useActionState } from "react";

export default function CheckOtpForm() {

    const [stateOtp, formActionOtp, pending] = useActionState(checkOtp, {})

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