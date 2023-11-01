import prisma from "@/app/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import NextAuth from "next-auth/next"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'your@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },

            authorize: async (credentials) => {
                if (!credentials) {
                    return null
                }
                const { email, password } = credentials
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                console.log('user', user);
                if (!user) {
                    return null
                }
                const userPassword = user.passwordHash
                const isValiPassword = bcrypt.compareSync(password, userPassword)
                if (!isValiPassword) {
                    return null
                }
                return user
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },

    secret: process.env.NEXTAUTH_SECRET,

    jwt: {
        async encode({ secret, token }) {
            if (!token) {
                throw new Error('No token to encode')
            }
            return jwt.sign(token, secret)
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error('No token to decode')
            }
            const decodedToken = jwt.verify(token, secret)
            if (typeof decodedToken === 'string') {
                return JSON.parse(decodedToken)
            } else {
                return decodedToken
            }
        }
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },

    callbacks: {
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.username = token.username
                session.user.email = token.email
                session.user.id = token.uid
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.username = `${user.firstName} ${user.lastName}`
                token.email = user.email
                token.uid = user?.id
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }