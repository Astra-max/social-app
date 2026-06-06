import LogIn from "@/components/auth/login"
import RegisterUI from "@/components/auth/register"
import DefaultLayout from "@/components/layouts/defaultLayout"


export default function HomePage() {
    return (
        <DefaultLayout>
            <RegisterUI />
        </DefaultLayout>
    )
}