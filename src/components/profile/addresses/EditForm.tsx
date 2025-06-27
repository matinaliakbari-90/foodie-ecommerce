"use client";

import { editAddress } from "@/actions/profile";
import { useActionState, useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import DeleteForm from "./DeleteForm";

interface AddressesType {
    id: number;
    title: string;
    address: string;
    cellphone: string;
    postal_code: string;
    province_id: number;
    city_id: number;
}

interface ProvicesAndCitiesType {
    provinces: {
        id: number;
        name: string
    }[];
    cities: {
        id: number;
        name: string;
        province_id: number
    }[];
}

interface StateAction {
    status: string | null;
    message: string | null;
}

export default function EditForm({ address, data }: { address: AddressesType, data: ProvicesAndCitiesType }) {

    const [citesFilter, setCitiesFilter] = useState(data.cities)

    const handleProvices = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCitiesFilter(data.cities.filter(city => city.province_id === parseInt(e.target.value)))
    }


    const [stateEdit, formActionEdit, pending] = useActionState<StateAction, FormData>(editAddress, { status: null, message: null })

    useEffect(() => {
        if (stateEdit?.status === 'error') {
            toast.error(stateEdit.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                rtl: true
            })
        } else if (stateEdit?.status === 'success') {
            toast.success(stateEdit.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                rtl: true
            })
        }
    }, [stateEdit])

    return (
        <div className="mt-3 position-relative">
            <form action={formActionEdit} className="card card-body">
                <div className="row g-4">
                    <div className="col col-md-6">
                        <label className="form-label">عنوان</label>
                        <input name="title" type="text" className="form-control" defaultValue={address.title} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شماره تماس</label>
                        <input name="cellphone" type="text" className="form-control" defaultValue={address.cellphone} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">کد پستی</label>
                        <input name="postal_code" type="text" className="form-control" defaultValue={address.postal_code} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">استان</label>
                        <select name="province_id" className="form-select" onChange={handleProvices} defaultValue={address.province_id}>
                            {data.provinces.map((province) => (
                                <option key={province.id} value={province.id}>{province.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شهر</label>
                        <select name="city_id" className="form-select" defaultValue={address.city_id}>
                            {citesFilter.map((cityFilter) => (
                                <option key={cityFilter.id} value={cityFilter.id}>{cityFilter.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-12">
                        <label className="form-label">آدرس</label>
                        <textarea name="address" rows={5} className="form-control" defaultValue={address.address}></textarea>
                    </div>

                    <input type="hidden" name="address_id" value={address.id} />
                </div>
                <div>
                    <button disabled={pending} className="btn btn-primary mt-4">
                        {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                        ویرایش
                    </button>
                </div>
            </form>

            <DeleteForm addressId={address.id} />
        </div>
    );
}