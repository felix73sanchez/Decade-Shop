'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";



export const getOrderById = async (id: string) => {
    const sessionn = await auth();

    if (!sessionn?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado para realizar esta accion'
        }
    }

    try {

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,

                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }

                        }
                    }
                }
            }
        });

        if (!order) throw `${id} no existe - FsX-500`;

        if (sessionn.user.role === 'user') {
            if (sessionn.user.id !== order.userId) {
                throw `${id} no es de ese usuario.`
            }
        }

        return {
            ok: true,
            order: order
        }

    } catch (error) {



        console.log(error);

        return {
            ok: false,
            message: 'Orden no existe. FSX-500'
        }
    }

}