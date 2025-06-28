"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";
import { cookies } from "next/headers";

interface StateAction {
    status: string | null;
    message: string | null;
    percent?: number | null;
    code?: string | null;
}

export async function createCoupon(state: StateAction, formData: FormData) {
    const code = formData.get('code')?.toString() as string;

    if (!code) {
        return {
            status: 'error',
            message: "اگر کوپن دارید، ابتدا کد را وارد کنید"
        }
    }

    const tokens = (await cookies()).get('tokens')
    const data = await postFetch('/check-coupon', { code }, { "Authorization": `Bearer ${tokens?.value}` })

    if (data.status === 'success') {
        return {
            status: data.status,
            message: 'کوپن بر سبد خرید شما اعمال شد',
            percent: data.data.percentage,
            code: code
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}