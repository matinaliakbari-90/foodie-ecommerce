"use client";

import { paymentVerify } from "@/actions/payment";
import { clearCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface PaymentStatus {
    status: boolean;
    error?: string;
}

export default function PaymentVerifyPage() {

    const searchParams = useSearchParams()
    const trackId = searchParams.get('trackId')
    const status = searchParams.get('status')

    const [payment, setPayment] = useState<PaymentStatus>({ status: false })
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const verify = async () => {
            const data = await paymentVerify(trackId as string, status as string)
            setPayment(data.payment)
            setLoading(false)

            if (data.payment?.status) {
                dispatch(clearCart())
            }
        }

        verify()
    }, [trackId, status, dispatch])

    return (
        <section className="auth_section ">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3 text-center">
                        {loading ? <span className="spinner-grow"></span> : (
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center mb-5">
                                        <i className={payment.status ? "bi bi-check-circle-fill text-success fs-1" : "bi bi-x-circle-fill text-danger fs-1"}></i>

                                        {payment.status ? (
                                            <h5 className="mt-3 text-success">پرداخت شما با موفقیت انجام شد</h5>
                                        ) : (
                                            <h5 className="mt-3 text-danger">{payment.error}</h5>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {payment.status ? (
                                            <>
                                                <Link href='/profile/orders' className="btn btn-primary">مشاهده سفارش</Link>
                                                <Link href='/' className="btn btn-dark">بازگشت به سایت</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href='/cart' className="btn btn-primary">سبد خرید</Link>
                                                <Link href='/' className="btn btn-dark">بازگشت به سایت</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}