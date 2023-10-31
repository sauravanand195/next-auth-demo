"use server"
import prisma from "@/app/lib/prisma"

export const addTodo = async (task, description, priority, status) => {
    await prisma.user.create({
        data: {
            task,
            description,
            priority,
            status
        },
    })
    return "Task added successfully"
};