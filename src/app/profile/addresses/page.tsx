import CreateForm from "@/components/profile/addresses/CreateForm";
import EditForm from "@/components/profile/addresses/EditForm";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";


interface AddressesType {
    id: number;
    title: string;
    address: string;
    cellphone: string;
    postal_code: string;
    province_id: number;
    city_id: number;
}

export default async function AddressesPage() {

    const tokens = (await cookies()).get('tokens')
    const data = await getFetch('/profile/addresses', { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <>
            <CreateForm data={data} />

            <hr />

            {data.addresses.map((address: AddressesType) => (
                <EditForm key={address.id} address={address} data={data} />
            ))}
        </>
    );
}