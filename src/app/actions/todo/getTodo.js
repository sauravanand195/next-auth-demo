"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next";

export const getTodo = async () => {
    const session = await getServerSession(authOptions)
    console.log('session', session);

    if (!session) { return 'Please sign in to proceed' }
    const users = await prisma.todo.findMany({
        where: {
            authorId: session?.user?.id
        },
    })
    return users
};