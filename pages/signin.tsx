import { withoutUser } from "@/src/hooks/auth/isAuth";
import { useSignin } from "@/src/hooks/auth/mutations";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Signin() {
    const router = useRouter();

    const { mutate: handleSignin, isSuccess, isLoading } = useSignin()

    // useState
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')



    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data: ISigninPayload = {
            email,
            password
        }

        handleSignin(data)

    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/')
        }
    }, [isSuccess])
    return (

        <div className="hero min-h-screen bg-base-200">
            
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" onChange={handleEmailChange} placeholder="email" className="input input-bordered" disabled={isLoading} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" onChange={handlePasswordChange} disabled={isLoading} placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>Login</button>
                            </div>
                        </form>
                        <div className="form-control mt-4">
                            <button className="btn " onClick={() => {
                                router.push('signup')
                            }} disabled={isLoading}>Sign-Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export const getServerSideProps = withoutUser()