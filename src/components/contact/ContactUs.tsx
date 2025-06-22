"use client";

import { create } from "@/actions/contact";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";

interface StateAction {
    status: string | null;
    message: string | null;
}

export default function ContactMe() {

    const [state, formAction, pending] = useActionState<StateAction, FormData>(create, { status: null, message: null });

    useEffect(() => {
        if (state?.status === 'error') {
            toast.error(state.message, {
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
        } else if (state?.status === 'success') {
            toast.success(state.message, {
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
    }, [state])

    return (
        <section className="book_section layout_padding">
            <div className="container">
                <div className="heading_container">
                    <h2>
                        تماس با ما
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_container">
                            <form action={formAction}>
                                <div>
                                    <input name="name" type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                                </div>
                                <div>
                                    <input name="email" type="email" style={{ direction: "rtl" }} className="form-control" placeholder="ایمیل" />
                                </div>
                                <div>
                                    <input name="subject" type="text" className="form-control" placeholder="موضوع پیام" />
                                </div>
                                <div>
                                    <textarea name="text" rows={10} style={{ height: '100px' }} className="form-control"
                                        placeholder="متن پیام">
                                    </textarea>
                                </div>
                                <div className="btn_box">
                                    <button disabled={pending}>
                                        {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                                        ارسال پیام
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="map_container ">
                            <div id="map" style={{ height: "345px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}