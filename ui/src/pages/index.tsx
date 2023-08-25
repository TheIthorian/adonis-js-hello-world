import * as React from 'react'

import { Inter } from 'next/font/google'

import { HomeLayout } from '@/layout/home'
import { CONFIG } from '@/config'
import { Notes } from '@/components/notes'
import { Nav } from '@/components/nav'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

async function getUserDetails() {
    const res = await fetch(CONFIG.AUTH_BASE + '/me', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') ?? '' },
    })

    if (!res.ok) {
        throw new Error('Error fetching data', { cause: await res.json() })
    }

    return await res.json()
}

export default function Home() {
    const [userDetails, setUserDetails] = React.useState()
    const router = useRouter()

    React.useEffect(() => {
        getUserDetails()
            .then(setUserDetails)
            .catch((error) => {
                console.error(error)
                router.push('login')
            })
    }, [])

    if (!userDetails) {
        return (
            <HomeLayout>
                <Nav />
                <p>Loading...</p>
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
            <Nav />
            <Notes />
        </HomeLayout>
    )
}
