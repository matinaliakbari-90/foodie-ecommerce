"use client";

import { useState } from "react";

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


export default function EditForm({ address, data }: { address: AddressesType, data: ProvicesAndCitiesType }) {

    const [citesFilter, setCitiesFilter] = useState(data.cities.filter(city => city.province_id === data.provinces[0].id))

    const handleProvices = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCitiesFilter(data.cities.filter(city => city.province_id === parseInt(e.target.value)))
    }

    return (
        <div className="mt-3">
            <div className="card card-body">
                <div className="row g-4">
                    <div className="col col-md-6">
                        <label className="form-label">عنوان</label>
                        <input type="text" className="form-control" defaultValue={address.title} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شماره تماس</label>
                        <input type="text" className="form-control" defaultValue={address.cellphone} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">کد پستی</label>
                        <input type="text" className="form-control" defaultValue={address.postal_code} />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">استان</label>
                        <select className="form-select" onChange={handleProvices} defaultValue={address.province_id}>
                            {data.provinces.map((province) => (
                                <option key={province.id} value={province.id}>{province.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شهر</label>
                        <select className="form-select" defaultValue={address.city_id}>
                            {citesFilter.map((cityFilter) => (
                                <option key={cityFilter.id} value={cityFilter.id}>{cityFilter.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-12">
                        <label className="form-label">آدرس</label>
                        <textarea rows={5} className="form-control" defaultValue={address.address}></textarea>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary mt-4">
                        ویرایش
                    </button>
                </div>
            </div>
        </div>
    );
}