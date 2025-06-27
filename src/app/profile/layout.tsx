"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()

    return (
        <section className="profile_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/profile" className={pathname === '/profile' ? 'text-active-click' : ''}>اطلاعات کاربر</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/addresses" className={pathname === '/profile/addresses' ? 'text-active-click' : ''}>آدرس ها</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/orders" className={pathname === '/profile/orders' ? 'text-active-click' : ''}>سفارشات</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/transactions" className={pathname === '/profile/transactions' ? 'text-active-click' : ''}>تراکنش ها</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href='#'>خروج</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-lg-9">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
