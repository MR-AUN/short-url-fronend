import { withoutUser } from "@/src/hooks/auth/isAuth";
import { useSignup } from "@/src/hooks/auth/mutations";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Signup() {
    const router = useRouter()
    const { mutate: handleSignup, isSuccess, isLoading } = useSignup()

    const [formData, setFormData] = useState<ISignupPayload>({
        email: '',
        password: '',
        username: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSignup(formData)
    }

    useEffect(() => {
        if (isSuccess) router.push("/");
    }, [isSuccess]);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    value={formData.username}
                                    type="text" placeholder="username" className="input input-bordered"  disabled={isLoading}/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    value={formData.email}
                                    placeholder="email" className="input input-bordered"  disabled={isLoading} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                    placeholder="password" className="input input-bordered"  disabled={isLoading} />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary"  disabled={isLoading}>Sign Up now!</button>
                            </div>
                        </form>
                        <div className="form-control mt-4">
                            <button className="btn " onClick={() => {
                                router.push('signin');
                            }}  disabled={isLoading}>Sign-in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = withoutUser()