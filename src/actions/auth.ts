"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";
import { cookies } from "next/headers";


type User = {
    id: number;
    name: string;
    email: string;
}

interface StateAction {
    status: string | null;
    message: string | null;
    user?: User | null;
}

export async function login(stateLogin: StateAction, formData: FormData) {
    const cellphone = formData.get("cellphone") as string;

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
            message: handleError(data.message)
        };
    }
}




export async function checkOtp(stateOtp: StateAction, formData: FormData) {
    const otp = formData.get("otp") as string;

    if (!otp) {
        return {
            status: 'error',
            message: 'کد ورود الزامی است .'
        }
    }

    const pattern = /^[0-9]{6}$/;
    if (!pattern.test(otp.toString())) {
        return {
            status: 'error',
            message: 'فرمت کد ورود صحیح نیست .'
        }
    }

    const loginToken = (await cookies()).get('login_token')
    if (!loginToken) {
        return {
            status: 'error',
            message: 'توکن ورودی شما نامعتبر است، بار دیگر تلاش کنید'
        }
    }

    const data = await postFetch('/auth/check-otp', { otp: otp.toString(), login_token: loginToken?.value })

    if (data.status === 'success') {
        (await cookies()).delete('login_token');

        (await cookies()).set({
            name: 'tokens',
            value: data.data.token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,  // 1 week
            secure: process.env.NODE_ENV === 'production'
        })

        return {
            status: data.status,
            message: 'شما با موفقیت وارد شدید .',
            user: data.data.user
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}




export async function me() {
    const tokens = (await cookies()).get('tokens')

    if (!tokens) {
        return {
            error: 'Not Authorized'
        }
    }

    const data = await postFetch('/auth/me', {}, { "Authorization": `Bearer ${tokens?.value}` })

    if (data.status === 'success') {
        return {
            user: data.data
        }
    } else {
        return {
            error: 'User Forbbiden'
        }
    }
}




export async function resendOtp() {
    const loginToken = (await cookies()).get('login_token');

    if (!loginToken) {
        return {
            status: 'error',
            message: 'توکن ورودی شما نامعتبر است، بار دیگر تلاش کنید'
        }
    }

    const data = await postFetch('/auth/resend-otp', { login_token: loginToken.value })

    if (data.status === 'success') {
        (await cookies()).set({
            name: 'login_token',
            value: data.data.login_token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,  // 1 week
            secure: process.env.NODE_ENV === 'production'
        })

        return {
            status: data.status,
            message: 'کد ورود دوباره برای شما ارسال شد .'
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}