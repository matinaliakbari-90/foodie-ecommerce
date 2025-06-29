"use client"

import { logout } from "@/actions/auth";
import AuthContext, { AuthContextType } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast, Zoom } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()
    const { logoutContext } = useContext(AuthContext) as AuthContextType;
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout();
            logoutContext()
            router.push('/')

            toast.info('شما از سیستم خارج شدید', {
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

        } catch {
            toast.error('خطا در عملیات خروج', {
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
    }

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
                                <Link href='#' onClick={handleLogout}>خروج</Link>
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
