import Loading from "@/components/profile/transactions/Loading";
import Table from "@/components/profile/transactions/Table";
import { Suspense } from "react";

export default async function TransactionsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const params = new URLSearchParams();
    const resolveParams = await searchParams;

    if (resolveParams.page) {
        params.set('page', resolveParams.page.toString())
    }

    return (
        <Suspense key={params.toString()} fallback={<Loading />}>
            <Table params={params.toString()} />
        </Suspense>
    );
}