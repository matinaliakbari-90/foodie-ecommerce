import EditProfile from "@/components/profile/EditProfile";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export default async function ProfilePage() {

    const tokens = (await cookies()).get('tokens')
    const user = await getFetch('/profile/info', { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <EditProfile user={user} />
    );
}