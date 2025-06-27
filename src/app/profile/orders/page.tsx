import Loading from "@/components/profile/orders/Loading";
import Table from "@/components/profile/orders/Table";
import { Suspense } from "react";

export default async function OrdersPage() {



    return (
        <Suspense fallback={<Loading />}>
            <Table />
        </Suspense>
    );
}