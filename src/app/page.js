import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import Landing from './components/Landing'

const Navbar = async () => {
    const session = await getServerSession(authOptions)

    return (
        <>
            <Landing session={session} />
        </>
    )
}

export default Navbar