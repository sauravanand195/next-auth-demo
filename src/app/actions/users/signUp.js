"use server"
import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'

export const signUp = async (firstName, lastName, email, password) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        }
    })
    console.log('user', user);
    if (user) {
        console.log('inside');
        return "User with this email already exists"
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
        return "Successfully created new user"
    }
}
