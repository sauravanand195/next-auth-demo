"use server"
import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'

export const signUp = async (firstName, lastName, email, password) => {
    const res = { msg: "", error: 1 }
    const user = await prisma.users.findUnique({
        where: {
            email,
        }
    })
    if (user) {
        res.msg = "User with this email already exists"
        return res
    } else {
        const passwordHash = bcrypt.hashSync(password, 10)
        await prisma.users.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash
            }
        })
        res.error = 0;
        res.msg = "Successfully created new user"
        return res
    }
}
