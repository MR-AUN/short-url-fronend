import { withoutShort } from "@/src/hooks/shorter/isShort"
import { useRouter } from "next/router"

export default function Shorter() {
    return (
        <></>
    )
    
}

export const getServerSideProps = withoutShort()
