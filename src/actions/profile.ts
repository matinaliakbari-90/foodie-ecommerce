"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


interface StateAction {
    status: string | null;
    message: string | null;
}

export async function editProfile(state: StateAction, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (name === '') {
        return {
            status: 'error',
            message: 'فیلد نام الزامی است'
        }
    }

    if (email === '') {
        return {
            status: 'error',
            message: 'فیلد ایمیل الزامی است'
        }
    }

    const tokens = (await cookies()).get('tokens')
    const data = await postFetch('/profile/info/edit', { name, email }, { "Authorization": `Bearer ${tokens?.value}` })

    if (data.status === 'success') {
        revalidatePath('/profile')

        return {
            status: data.status,
            message: 'ویرایش شما با موفقیت انجام شد'
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}