import Loading from "@/components/profile/orders/Loading";
import Table from "@/components/profile/orders/Table";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function OrdersPage() {

    const tokens = (await cookies()).get('tokens')
    const data = await getFetch('/profile/orders', { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <Suspense fallback={<Loading />}>
            <Table data={data} />
        </Suspense>
    );
}