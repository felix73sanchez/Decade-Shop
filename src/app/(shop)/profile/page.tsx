import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import JsonViewer from "@/components/perfil/JsonViewer"; // Ajusta la ruta según tu estructura de proyecto

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/');
    }

    return (
        <div className="my-20 m-mBody border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
            <Title title="Perfil " className="border-b-customBW border-colorPrimary bg-color3" />

            <JsonViewer data={session.user} />
        </div>
    );
}
