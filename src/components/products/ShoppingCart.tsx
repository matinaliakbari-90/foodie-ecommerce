"use client";

import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Zoom } from "react-toastify";

interface ProductPropsType {
    id: number;
    name: string;
    primary_image: string;
    description: string;
    is_sale: boolean;
    sale_price: number;
    price: number;
    slug: string;
    quantity: number;
}

export default function ShoppingCart({ product }: { product: ProductPropsType }) {

    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>()
    const cartItems = useSelector((state: RootState) => state.shoppingCart.cart)
    const toastId = useRef<string | number | null>(null);

    const handleAddProductCart = () => {
        const existItem = cartItems.some((item) => item.product.id === product.id);

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
            return;
        }

        dispatch(removeFromCart(product.id))
        dispatch(addToCart({ product, qty: quantity }));

        if (!toast.isActive(toastId.current as string)) {
            toastId.current = toast.success("محصول به سبد خرید شما اضافه شد", {
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
    };


    return (
        <div className="mt-5 d-flex">
            <button className="btn-add" onClick={() => handleAddProductCart()}>افزودن به سبد خرید</button>
            <div className="input-counter ms-4">
                <span className="plus-btn" onClick={() => quantity < product.quantity && setQuantity(quantity + 1)}>
                    +
                </span>
                <div className="input-number">{quantity}</div>
                <span className="minus-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                    -
                </span>
            </div>
        </div>
    );
}