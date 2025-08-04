'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

    const {isLoaded, isSignedIn, user} = useUser()
    const router = useRouter()
    useEffect(() => {
        const role = user?.publicMetadata.role
        if (role) {
            router.push(`/${role}`)
        } 
    }, [user, router])

    return (
        <div className="h-screen flex flex-col items-center justify-center h-scree bg-mapSkyLight">
            <SignIn.Root>
                <SignIn.Step name="start" className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2">
                    <h1 className="flex items-center gap-2 text-xl font-bold justify-center">
                        <Image src="/logo.png" alt="logo" width={32} height={32} />
                        <span className="text-2xl font-bold">MAPS</span>
                    </h1>
                    <h2 className="text-sm text-gray-500 text-center mb-4">Please sign in to continue</h2>
                    <Clerk.GlobalError className="text-red-500 text-sm" />
                    <Clerk.Field name="identifier" className="flex flex-col gap-2">
                        <Clerk.Label className="text-sm font-medium text-gray-500">Username</Clerk.Label>
                        <Clerk.Input type="text" required className="p-2 rounded-md ring-1 ring-gray-300"/>
                        <Clerk.FieldError className="text-xs text-red-400" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="flex flex-col gap-2">
                        <Clerk.Label className="text-sm font-medium text-gray-500">Password</Clerk.Label>
                        <Clerk.Input type="password" required className="p-2 rounded-md ring-1 ring-gray-300"/>
                        <Clerk.FieldError className="text-xs text-red-400" />
                    </Clerk.Field>
                    <SignIn.Action submit className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">Sign in</SignIn.Action>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    )
}

export default LoginPage;