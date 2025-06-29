"use client";

import { sendPayment } from "@/actions/payment";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";


interface PaymentProps {
    cart: {
        product: { id: number };
        qty: number;
    }[];
    coupon: { percent: number; code: string };
    addressId: number | null;
}


interface StateAction {
    status: string | null;
    message: string | null;
    url?: string | null;
}

export default function Payment({ cart, coupon, addressId }: PaymentProps) {

    const [state, formAction, pending] = useActionState<StateAction, FormData>(sendPayment, { status: null, message: null });
    const router = useRouter()


    useEffect(() => {
        if (state?.status === 'error') {
            toast.error(state.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
                transition: Zoom,
                draggable: true,
                closeOnClick: true,
                rtl: true,
            })
        } else if (state?.status === 'success') {
            toast.success(state.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
                transition: Zoom,
                draggable: true,
                closeOnClick: true,
                rtl: true,
            })

            if (state?.url) {
                router.push(state.url)
            }
        }
    }, [state, router])

    
    return (
        <>
            <form action={formAction}>
                <input name="cart" type="hidden" value={JSON.stringify(cart.map(item => ({
                    id: item.product.id,
                    qty: item.qty
                })))} />

                <input name="coupon" type="hidden" value={coupon.code} />

                {addressId !== null && (
                    <input name="address_id" type="hidden" value={addressId} />
                )}

                <button disabled={pending} className="user_option btn-auth mt-4">
                    {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                    پرداخت
                </button>
            </form>
        </>
    );
}