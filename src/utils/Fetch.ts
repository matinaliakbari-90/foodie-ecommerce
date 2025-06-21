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



export { getFetch }