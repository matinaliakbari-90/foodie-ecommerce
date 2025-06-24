"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";
import { cookies } from "next/headers";


interface StateAction {
    status: string | null;
    message: string | null;
}

export async function login(state: StateAction, formData: FormData) {
    const cellphone = formData.get("cellphone") as string | null;

    if (!cellphone) {
        return {
            status: 'error',
            message: 'شماره موبایل الزامی است .'
        }
    }

    const mobileRegex = /^(?:98|\+98|0)?9[0-9]{9}$/;
    if (!mobileRegex.test(cellphone.toString())) {
        return {
            status: 'error',
            message: 'فرمت شماره موبایل درست نیست'
        }
    }

    const data = await postFetch('/auth/login', { cellphone })

    if (data.status === 'success') {
        (await cookies()).set({
            name: 'login_token',
            value: data.data.login_token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,  // 1 week
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        })

        return {
            status: data.status,
            message: 'کد ورود با موفقیت برای شما ارسال شد .'
        }
    } else {
        return {
            status: data.status,
            message: String(handleError(data.message))
        };
    }
}