import { auth } from "@/auth.config";
import { Footer, Title } from "@/components";
import { redirect } from "next/navigation";
import JsonViewer from "@/components/perfil/JsonViewer"; // Ajusta la ruta según tu estructura de proyecto
import { allFont } from "@/config/fonts";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <div className="mt-20 flex-grow mx-mBody">
                <div className={`${allFont.className} border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden`}>
                    <Title title="Perfil" className="border-b-customBW border-colorPrimary bg-color3" />
                    <JsonViewer data={session.user} />
                </div>
               
            </div>
            <Footer /> {/* Componente del pie de página */}
        </div>
    );
}
