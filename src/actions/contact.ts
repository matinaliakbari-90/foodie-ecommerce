"use server";


interface StateAction {
    status: string | null;
    message: string | null;
}


export async function create(state:StateAction, formData:FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const text = formData.get('text');


    if (name === '') {
        return {
            status: 'error',
            message: 'فیلد نام و نام خانوادگی نمی تواند خالی باشه باشد'
        }
    }

    if (email === '') {
        return {
            status: 'error',
            message: 'فیلد ایمیل نمی تواند خالی باشه باشد'
        }
    }

    if (subject === '') {
        return {
            status: 'error',
            message: 'فیلد موضوع پیام نمی تواند خالی باشه باشد'
        }
    }

    if (text === '') {
        return {
            status: 'error',
            message: 'فیلد متن پیام نمی تواند نمی تواند خالی باشه باشد'
        }
    }


    return {
        status: null,
        message: null
    }
}