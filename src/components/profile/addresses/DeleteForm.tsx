"use client";

import { deleteAddress } from "@/actions/profile";
import { useActionState } from "react";

interface StateAction {
    status: string | null;
    message: string | null;
}


export default function DeleteForm({ addressId }: { addressId: number }) {

    const [, formActionDelete, pending] = useActionState<StateAction, FormData>(deleteAddress, { status: null, message: null })

    return (
        <form action={formActionDelete} className="btn-address-delete">
            <input type="hidden" name="address_id" value={addressId} />
            <button disabled={pending} className="btn btn-dark">
                {pending && <span className="spinner-border spinner-border-sm me-2"></span>}
                حذف
            </button>
        </form>
    );
}