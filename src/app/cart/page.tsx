"use client";

import Coupon from "@/components/cart/Coupon";
import { clearCart, decrement, increment, removeFromCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getBlurDataURL, numberFormat, salePresent } from "@/utils/Helper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector((state: RootState) => state.shoppingCart.cart)

    const [coupon, setCoupon] = useState({ 'percent': 0, 'code': '' })

    return (
        <>
            {cart.length !== 0 ? (
                <section className="single_page_section layout_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="row gy-5">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>محصول</th>
                                                        <th>نام</th>
                                                        <th>قیمت</th>
                                                        <th>تعداد</th>
                                                        <th>قیمت کل</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map(item => (
                                                        <tr key={item.product.id}>
                                                            <th>
                                                                <Image src={item.product.primary_image} placeholder="blur" blurDataURL={getBlurDataURL()} width={100} height={66} alt="product-cart" style={{ color: "transparent" }} />
                                                            </th>
                                                            <td className="fw-bold">{item.product.name}</td>
                                                            <td>
                                                                {item.product.is_sale ? (
                                                                    <>
                                                                        <span>{numberFormat(item.product.sale_price)}</span>
                                                                        <del className="text-danger me-2">{numberFormat(item.product.price)}</del>
                                                                        <span className="ms-1">تومان</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>{numberFormat(item.product.price)}</span>
                                                                        <span className="ms-1">تومان</span>
                                                                    </>
                                                                )}

                                                                {item.product.is_sale && (
                                                                    <div className="text-secondary" style={{ fontSize: '13px' }}>%{salePresent(item.product.price, item.product.sale_price)} تخفیف</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="input-counter">
                                                                    <span className="plus-btn" onClick={() => item.qty < item?.product.quantity && dispatch(increment(item.product.id))}>
                                                                        +
                                                                    </span>
                                                                    <div className="input-number">{item.qty}</div>
                                                                    <span className="minus-btn" onClick={() => item.qty > 1 && dispatch(decrement(item.product.id))}>
                                                                        -
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item.product.is_sale ? (
                                                                    <>
                                                                        <span>{numberFormat(item.product.sale_price * item.qty)}</span>
                                                                        <span className="ms-1">تومان</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>{numberFormat(item.product.price * item.qty)}</span>
                                                                        <span className="ms-1">تومان</span>
                                                                    </>
                                                                )}
                                                            </td>
                                                            <td onClick={() => dispatch(removeFromCart(item.product.id))}>
                                                                <i className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="btn btn-primary mb-4" onClick={() => dispatch(clearCart())}>پاک کردن سبد خرید</button>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <Coupon setCoupon={setCoupon} />

                                    <div className="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                                        <div>
                                            انتخاب آدرس
                                        </div>
                                        <select style={{ width: "200px" }} className="form-select ms-3" aria-label="Default select example">
                                            <option value='0'>منزل</option>
                                            <option value="1">محل کار</option>
                                        </select>
                                        <a href="profile.html" className="btn btn-primary">
                                            ایجاد آدرس
                                        </a>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-5">
                                    <div className="col-12 col-md-6">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <h5 className="card-title fw-bold">مجموع سبد خرید</h5>
                                                <ul className="list-group mt-4">
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>مجموع قیمت :</div>
                                                        <div>
                                                            535,000 تومان
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>تخفیف :
                                                            <span className="text-danger ms-1">10%</span>
                                                        </div>
                                                        <div className="text-danger">
                                                            53,500 تومان
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>قیمت پرداختی :</div>
                                                        <div>
                                                            481,500 تومان
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button className="user_option btn-auth mt-4">پرداخت</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="cart-empty">
                    <div className="text-center">
                        <div>
                            <i className="bi bi-basket-fill text-muted" style={{ fontSize: '86px' }}></i>
                        </div>
                        <h4 className="text-bold text-secondary">سبد خرید شما خالی است</h4>
                        <Link href="/menu" className="btn btn-outline-dark mt-3">
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}