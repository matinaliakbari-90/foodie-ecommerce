import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="profile_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="./profile">اطلاعات کاربر</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="./addresses">آدرس ها</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="./orders">سفارشات</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="./transactions">تراکنش ها</Link>
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
