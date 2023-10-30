import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import NavBarComp from './NavBarComp'

const Navbar = async () => {
    const session = await getServerSession(authOptions)

    return (
        <>
            <NavBarComp session={session} />
        </>
    )
}

export default Navbar