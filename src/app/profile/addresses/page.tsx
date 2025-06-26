import CreateForm from "@/components/profile/addresses/CreateForm";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export default async function AddressesPage() {

    const tokens = (await cookies()).get('tokens')
    const data = await getFetch('/profile/addresses', { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <CreateForm data={data} />
    );
}