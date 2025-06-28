"use client";

import { createCoupon } from "@/actions/coupon";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";

interface StateAction {
    status: string | null;
    message: string | null;
    percent?: number | null;
    code?: string | null;
}

export default function Coupon({ setCoupon }: { setCoupon: (coupon: { percent: number, code: string }) => void }) {

    const [state, formAction, pending] = useActionState<StateAction, FormData>(createCoupon, { status: null, message: null });

    useEffect(() => {
        if (state?.status === 'error') {
            toast.warn(state.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
                transition: Zoom,
                closeOnClick: true,
                draggable: true,
                rtl: true,
            })
        } else if (state?.status === 'success') {
            toast.success(state.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
                transition: Zoom,
                closeOnClick: true,
                draggable: true,
                rtl: true,
            })

            if (state?.code && state?.percent) {
                setCoupon({ percent: state.percent, code: state.code })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div className="col-12 col-md-6">
            <form action={formAction} className="input-group mb-3">
                <input name="code" type="text" className="form-control" placeholder="کد تخفیف" />
                <button disabled={pending} className="input-group-text" id="basic-addon2">
                    {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                    اعمال کد تخفیف
                </button>
            </form>
        </div>
    );
}