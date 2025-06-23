"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginateType {
    links: {
        label: string;
        active: boolean;
    }[]
}


export default function Paginate({ links }: PaginateType) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleParams = (page: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page)

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <nav className="d-flex justify-content-center mt-5">
            <ul className="pagination">
                {links.slice(1, -1).map((link, index) => (
                    <li key={index} className={link.active ? 'page-item active' : 'page-item'}>
                        <button onClick={() => handleParams(link.label)} className="page-link">{link.label}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}