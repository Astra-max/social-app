import LogIn from "@/components/auth/login"
import DefaultLayout from "@/components/layouts/defaultLayout"


export default function HomePage() {
    return (
        <DefaultLayout>
            <LogIn />
        </DefaultLayout>
    )
}