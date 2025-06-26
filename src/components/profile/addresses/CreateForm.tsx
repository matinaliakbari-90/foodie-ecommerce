"use client";

import { createAddress } from "@/actions/profile";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";

interface AddressesProps {
    provinces: { id: number; name: string }[];
    cities: { id: number; name: string; province_id: number }[];
}

interface StateAction {
    status: string | null;
    message: string | null;
}

export default function CreateForm({ data }: { data: AddressesProps }) {
    const [title, setTitle] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [provinceId, setProvinceId] = useState(data.provinces[0].id.toString());
    const [cityId, setCityId] = useState(data.cities.find((city) => city.province_id === data.provinces[0].id)?.id.toString() || "");
    const [address, setAddress] = useState("");


    const citiesFilter = data.cities.filter(
        (city) => city.province_id.toString() === provinceId
    );


    const changeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProvinceId = e.target.value;
        setProvinceId(newProvinceId);
        const firstCity = data.cities.find((city) => city.province_id.toString() === newProvinceId);
        setCityId(firstCity?.id.toString() || "");
    };



    const [stateCreate, formActionCreate, pending] = useActionState<StateAction, FormData>(createAddress, { status: null, message: null });

    useEffect(() => {
        if (stateCreate?.status === "error") {
            toast.error(stateCreate.message, {
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
            });
        } else if (stateCreate?.status === "success") {
            toast.success(stateCreate.message, {
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
            });

            // Reset form
            setTitle("");
            setCellphone("");
            setPostalCode("");
            setProvinceId(data.provinces[0].id.toString());
            setCityId(data.cities.find((city) => city.province_id === data.provinces[0].id)?.id.toString() || "");
            setAddress("");
        }
    }, [data.cities, data.provinces, stateCreate]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("cellphone", cellphone);
        formData.append("postal_code", postalCode);
        formData.append("province_id", provinceId);
        formData.append("city_id", cityId);
        formData.append("address", address);
        startTransition(() => {
            formActionCreate(formData);
        });
    };

    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample">
                ایجاد آدرس جدید
            </button>

            <div className="collapse mt-3" id="collapseExample">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label">عنوان</label>
                            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">شماره تماس</label>
                            <input className="form-control" value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">کد پستی</label>
                            <input className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">استان</label>
                            <select className="form-select" value={provinceId} onChange={changeProvince}>
                                {data.provinces.map((province) => (
                                    <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">شهر</label>
                            <select className="form-select" value={cityId} onChange={(e) => setCityId(e.target.value)}>
                                {citiesFilter.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">آدرس</label>
                            <textarea className="form-control" rows={5} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button disabled={pending} className="btn btn-primary mt-4">
                            {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                            ایجاد
                        </button>
                    </div>
                </form>
            </div>

            <hr />
        </>
    );
}
