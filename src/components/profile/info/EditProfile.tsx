"use client";

import { editProfile } from "@/actions/profile";
import { useActionState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";


interface UserProfileType {
    id: number;
    name: string;
    email: string;
    cellphone: string;
}

interface StateAction {
    status: string | null;
    message: string | null;
}

export default function EditProfile({ user }: { user: UserProfileType }) {

    const [state, formAction, pending] = useActionState<StateAction, FormData>(editProfile, { status: null, message: null })

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
        <form action={formAction} className="vh-70">
            <div className="row g-4">
                <div className="col col-md-6">
                    <label className="form-label" htmlFor="name">نام و نام خانوادگی</label>
                    <input name="name" type="text" id="name" className="form-control" defaultValue={user.name} />
                </div>
                <div className="col col-md-6">
                    <label className="form-label" htmlFor="email">ایمیل</label>
                    <input name="email" type="email" id="email" className="form-control" defaultValue={user.email} />
                </div>
                <div className="col col-md-6">
                    <label className="form-label">شماره تلفن</label>
                    <input type="text" disabled className="form-control" defaultValue={user.cellphone} />
                </div>
            </div>
            <button disabled={pending} type="submit" className="btn btn-primary mt-4">
                {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                ویرایش
            </button>
        </form>
    );
}