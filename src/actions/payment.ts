"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";
import { cookies } from "next/headers";

interface StateAction {
    status: string | null;
    message: string | null;
    url?: string | null;
}

export async function sendPayment(state: StateAction, formData: FormData) {
    const cart = formData.get('cart') as string;
    const coupon = (formData.get("coupon") as string) ?? "";
    const address_id = formData.get('address_id') as string;

    if (!address_id) {
        return {
            status: 'error',
            message: "ابتدا یک آدرس انتخاب کنید"
        }
    }


    const tokens = (await cookies()).get('tokens')
    const data = await postFetch('/payment/send', { cart: JSON.parse(cart), coupon, address_id }, { "Authorization": `Bearer ${tokens?.value}` })

    if (data.status === 'success') {
        return {
            status: data.status,
            message: 'درحال انتقال به درگاه پرداخت',
            url: data.data.url
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}