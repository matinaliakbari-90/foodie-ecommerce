"use client";

import { getAddresses } from "@/actions/cart";
import { useEffect, useState } from "react";
import Link from "next/link";

interface AddressType {
    id: number;
    title: string;
}

export default function Addresses({ setAddressId }: { setAddressId: (id: number) => void }) {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getAddresses()
            setAddresses(data)
            setLoading(false)
        }

        fetchAddresses()
    }, [])

    if (loading) {
        return <div className="spinner-grow spinner-grow-sm"></div>
    }

    if (addresses.length === 0) {
        return <Link href='/profile/addresses' className="btn btn-primary">ایجاد آدرس</Link>
    }

    return (
        <>
            <div>
                انتخاب آدرس
            </div>
            <select onChange={(e) => setAddressId(Number(e.target.value))} style={{ width: "200px" }} defaultValue="" className="form-select ms-3" aria-label="Default select example">
                <option value="" disabled>انتخاب آدرس</option>
                {addresses.map((address: AddressType) => (
                    <option key={address.id} value={address.id}>{address.title}</option>
                ))}
            </select>
        </>
    );
}