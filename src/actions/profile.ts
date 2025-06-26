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



export async function createAddress(state: StateAction, formData: FormData) {
    const rowFormData = {
        title: formData.get('title'),
        cellphone: formData.get('cellphone'),
        postal_code: formData.get('postal_code'),
        province_id: formData.get('province_id'),
        city_id: formData.get('city_id'),
        address: formData.get('address'),
    }


    if (rowFormData.title === '') {
        return {
            status: 'error',
            message: 'فیلد عنوان الزامی است .'
        }
    }

    const cellphonePattern = /^(?:98|\+98|0)?9[0-9]{9}$/;
    if (!rowFormData.cellphone || !cellphonePattern.test(rowFormData.cellphone.toString())) {
        return {
            status: 'error',
            message: 'فیلد شماره تماس نامعتبر است'
        }
    }

    const pastalCodePattern = /^\d{5}[ -]?\d{5}$/i;
    if (!rowFormData.postal_code || !pastalCodePattern.test(rowFormData.postal_code.toString())) {
        return {
            status: 'error',
            message: 'فیلد کد پستی نامعتبر است'
        }
    }

    if (rowFormData.address === '') {
        return {
            status: 'error',
            message: 'فیلد آدرس الزامی است .'
        }
    }


    const tokens = (await cookies()).get('tokens')
    const data = await postFetch('/profile/addresses/create', {
        title: rowFormData.title as string,
        cellphone: rowFormData.cellphone as string,
        postal_code: rowFormData.postal_code as string,
        province_id: rowFormData.province_id as string,
        city_id: rowFormData.city_id as string,
        address: rowFormData.address as string
    }, { "Authorization": `Bearer ${tokens?.value}` })

    if (data.status === 'success') {
        return {
            status: data.status,
            message: 'ثبت آدرس با موفقیت انجام شد .'
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}