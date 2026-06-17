import { useSelector } from "react-redux";
import LogIn from "../auth/login";
import { authSelector } from "@/store/features/authSlice";


export default function ProtectedRoutes(
    { children}: { children : React.ReactNode}
) {
    const { accessToken } = useSelector(authSelector)
}