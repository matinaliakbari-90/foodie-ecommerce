"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sort() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleSort = (type: string) => {
        const params = new URLSearchParams(searchParams)
        params.delete('page')
        params.set('sortBy', type)

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <label className="form-label">مرتب سازی</label>
            <div className="form-check my-2">
                <input onClick={() => handleSort('max')} id="max" className="form-check-input" type="radio" name="flexRadioDefault"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'max'}
                />
                <label htmlFor="max" className="form-check-label cursor-pointer">
                    بیشترین قیمت
                </label>
            </div>
            <div className="form-check my-2">
                <input onClick={() => handleSort('min')} id="min" className="form-check-input" type="radio" name="flexRadioDefault"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'min'}
                />
                <label htmlFor="min" className="form-check-label cursor-pointer">
                    کمترین قیمت
                </label>
            </div>
            <div className="form-check my-2">
                <input onClick={() => handleSort('bestseller')} id="bestseller" className="form-check-input" type="radio" name="flexRadioDefault"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'bestseller'}
                />
                <label htmlFor="bestseller" className="form-check-label cursor-pointer">
                    پرفروش ترین
                </label>
            </div>
            <div className="form-check my-2">
                <input onClick={() => handleSort('sale')} id="sale" className="form-check-input" type="radio" name="flexRadioDefault"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'sale'}
                />
                <label htmlFor="sale" className="form-check-label cursor-pointer">
                    با تخفیف
                </label>
            </div>
        </div>
    );
}