type PostBody = {
    name?: string;
    email?: string;
    subject?: string;
    text?: string;

    cellphone?: string;
    otp?: string;
    login_token?: string;

    title?: string;
    postal_code?: string;
    province_id?: string;
    city_id?: string;
    address?: string;
    address_id?: string;

    code?: string;

    cart?: string;
    coupon?: string;

    token?: string;
    status?: string;
} | null


const getFetch = async (url: string, headers?: object) => {
    const res = await fetch(`${process.env.API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
    })

    if (res.ok) {
        const data = await res.json();
        return data.data;
    } else {
        throw new Error(`مشکل در دریافت اطلاعات کد ${res.status}`)
    }
}


const postFetch = async (url: string, body: PostBody, headers?: object) => {
    const res = await fetch(`${process.env.API_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers
        },
        body: JSON.stringify(body)
    })

    return await res.json();
}



export { getFetch, postFetch }