'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {

        return {
            ok: false,
            message: 'No tienes permisos de administrador para realizar esta acción'
        }
    }

    try {

        const newRole = role === 'admin' ? 'admin' : 'user';

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: newRole
            }
        });

        return {
            ok: true
        }

        revalidatePath('/admin/users');



    } catch (error) {
        return {
            ok: false,
            message: 'Error al cambiar el rol del usuario'
        }
    }

}