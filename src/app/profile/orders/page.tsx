import Loading from "@/components/profile/orders/Loading";
import Table from "@/components/profile/orders/Table";
import { Suspense } from "react";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const params = new URLSearchParams();
    const resolveParams = (await searchParams);

    if (resolveParams.page) {
        params.set('page', resolveParams.page.toString())
    }

    return (
        <Suspense key={params.toString()} fallback={<Loading />}>
            <Table params={params.toString()} />
        </Suspense>
    );
}