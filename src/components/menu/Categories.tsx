"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoriesType {
    categories: {
        id: number;
        name: string;
    }[];
}


export default function Categories({ categories }: CategoriesType) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleCategory = (id: number) => {
        const params = new URLSearchParams(searchParams)
        params.delete('page')
        params.set('category', id.toString())

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="filter-list">
            <div className="form-label">
                دسته بندی
            </div>
            <ul>
                {categories.map(category => (
                    <li onClick={() => handleCategory(category.id)} key={category.id}
                        className={searchParams.has('category') && searchParams.get('category') === category.id.toString() ? 'my-2 filter-list-active' : 'my-2 cursor-pointer'}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}