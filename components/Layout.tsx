import { useSignout } from "@/src/hooks/auth/mutations";
import { useGetUserInfo } from "@/src/hooks/auth/queries";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface LayoutProps {
    children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
    const router = useRouter()
    const { mutate, isLoading, isSuccess } = useSignout()

    const handleSignout = () => {
        mutate()
        // router.push('/signin')
    }

    useEffect(() => {
        if (isSuccess) router.push('/signin')
    }, [isSuccess])

    return (
        <div className="min-h-screen bg-base-200 ">
            <div className="navbar bg-base-100 mb-4">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-xl">Short URL</a>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="cat.jpg" />
                            </div>

                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSignout} >Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* End Nav */}
            <div className="min-h-screen">
                {/* content */}
                <div className="container mx-auto">
                    {children}
                </div>
            </div>



        </div>
    )
}

export default Layout