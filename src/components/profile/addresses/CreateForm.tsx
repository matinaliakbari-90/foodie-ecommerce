"use client"

import { createAddress } from "@/actions/profile";
import { ChangeEvent, useActionState, useState } from "react";

interface AddressesProps {
    provinces: {
        id: number;
        name: string;
    }[];
    cities: {
        id: number;
        name: string;
        province_id: number;
    }[]
}


interface StateAction {
    status: string | null;
    message: string | null;
}


export default function CreateForm({ data }: { data: AddressesProps }) {

    const [citiesFilter, setCitiesFilter] = useState(data.cities.filter(city => city.province_id === data.provinces[0].id))

    const changeProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        setCitiesFilter(data.cities.filter(city => city.province_id === parseInt(e.target.value)))
    }

    const [stateCreate, formActionCreate, pending] = useActionState<StateAction, FormData>(createAddress, { status: null, message: null })

    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseExample">
                ایجاد آدرس جدید
            </button>

            <div className="collapse mt-3" id="collapseExample">
                <form action={formActionCreate} className="card card-body">
                    <div className="row g-4">
                        <div className="col col-md-6">
                            <label className="form-label">عنوان</label>
                            <input name="title" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شماره تماس</label>
                            <input name="cellphone" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">کد پستی</label>
                            <input name="postal_code" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">استان</label>
                            <select name="province_id" className="form-select" onChange={changeProvince}>
                                {data.provinces.map(provice => (
                                    <option key={provice.id} value={provice.id}>{provice.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شهر</label>
                            <select name="city_id" className="form-select">
                                {citiesFilter.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-12">
                            <label className="form-label">آدرس</label>
                            <textarea name="address" rows={5} className="form-control"></textarea>
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