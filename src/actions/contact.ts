"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/Helper";


interface StateAction {
    status: string | null;
    message: string | null;
}


export async function create(state: StateAction, formData: FormData): Promise<StateAction> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const text = formData.get('text') as string;

    if (name === "" || email === "" || subject === "" || text === "") {
        return {
            status: "error",
            message: "تمام فیلد های مربوط به تماس با ما الزامی هستند"
        };
    }

    const data = await postFetch('/contact-us', { name, email, subject, text })

    if (data.status === 'success') {
        return {
            status: data.status,
            message: 'ارسال پیام با موفقیت انجام شد'
        }
    } else {
        return {
            status: data.status,
            message: String(handleError(data.message))
        }
    }
}