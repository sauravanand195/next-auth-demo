"use client"
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
    const { status } = useSession();
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        setMessage('Signing in ...')
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            console.log('signInResponse', signInResponse);
            if (!signInResponse || signInResponse.ok !== true) {
                setMessage('Invalid Credentials')
            } else {
                router.refresh()
            }
        } catch (err) {
            console.log('Error', err);
        }
        setMessage(message)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/')
        }
    }, [status])


    return (
        <div>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleSubmit()}>Sign In</button>
            <p>{message}</p>
        </div>
    )
}

export default SignInForm