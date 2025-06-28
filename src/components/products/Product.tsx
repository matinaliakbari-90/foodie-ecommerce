"use client"

import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getBlurDataURL, numberFormat } from "@/utils/Helper";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Zoom } from "react-toastify";

interface ProductType {
    product: {
        id: number;
        name: string;
        primary_image: string;
        description: string;
        is_sale: boolean;
        sale_price: number;
        price: number;
        slug?: string;
        quantity: number;
    }
}

export default function Product({ product }: ProductType) {

    const dispath = useDispatch<AppDispatch>()
    const cartItems = useSelector((state: RootState) => state.shoppingCart.cart)

    const toastId = useRef<string | number | null>(null);

    const handleAddProductCart = () => {
        const existItem = cartItems.some(item => item.product.id === product.id)

        if (existItem) {
            if (!toast.isActive("exist")) {
                toast.info("محصول در سبد خرید شما وجود دارد", {
                    toastId: "exist",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "colored",
                    transition: Zoom,
                    closeOnClick: true,
                    draggable: true,
                    rtl: true,
                });
            }
        } else {

            dispath(removeFromCart(product.id))
            dispath(addToCart({ product, qty: 1 }))

            if (!toast.isActive(toastId.current as string)) {
                toastId.current = toast.success("محصول به سبد خرید شما اضافه شد", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "colored",
                    transition: Zoom,
                    draggable: true,
                    closeOnClick: true,
                    rtl: true,
                });
            }
        }
    }


    return (
        <div className="box">
            <div>
                <Link href={`/products/${product?.slug}`} className="img-box">
                    <Image className="img-fluid" placeholder="blur" blurDataURL={getBlurDataURL()} width={370} height={200} src={product.primary_image} alt="primary-image" />
                </Link>
                <div className="detail-box">
                    <h5>
                        <Link href={`/products/${product?.slug}`}>
                            {product.name}
                        </Link>
                    </h5>
                    <p>{product.description}</p>
                    <div className="options">
                        {product.is_sale ? (
                            <h6>
                                <span>{numberFormat(product.sale_price)}</span>
                                <del className="me-2 text-danger">{numberFormat(product.price)}</del>
                                <span style={{ marginRight: '4px' }}>تومان</span>
                            </h6>
                        ) : (
                            <h6>
                                {numberFormat(product.price)}
                                <span style={{ marginRight: '4px' }}>تومان</span>
                            </h6>
                        )}

                        <button onClick={() => handleAddProductCart()}>
                            <i className="bi bi-cart-fill text-white fs-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}