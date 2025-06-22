import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-col">
                        <div className="footer_contact">
                            <h4>
                                تماس با ما
                            </h4>
                            <div className="contact_link_box">
                                <Link href="/">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    <span>
                                        آدرس
                                    </span>
                                </Link>
                                <Link href="/">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                        <span className="my-0" style={{ direction: "ltr" }}>
                                            0913 423 0685
                                        </span>
                                    </div>
                                </Link>
                                <Link href="/">
                                    <i className="bi bi-envelope-fill"></i>
                                    <span>
                                        matinaliakbari54843590@gmail.com
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <div className="footer_detail">
                            <Link href="/" className="footer-logo">
                                فروشگاه فودی
                            </Link>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                            </p>
                            <div className="footer_social">
                                <Link href="/">
                                    <i className="bi bi-facebook"></i>
                                </Link>
                                <Link href="/">
                                    <i className="bi bi-twitter"></i>
                                </Link>
                                <Link href="/">
                                    <i className="bi bi-linkedin"></i>
                                </Link>
                                <Link href="/">
                                    <i className="bi bi-instagram"></i>
                                </Link>
                                <Link href="/">
                                    <i className="bi bi-pinterest"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <h4>
                            ساعت کاری
                        </h4>
                        <p>
                            هر روز
                        </p>
                        <p>
                            10.00 صبح تا 12.00 شب
                        </p>
                    </div>
                </div>
                <div className="footer-info">
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی
                    </p>
                </div>
            </div>
        </footer>
    );
}