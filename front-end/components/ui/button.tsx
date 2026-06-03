import { ButtonData } from "@/types"
import { useFormStatus } from "react-dom"


export function Button({data}: {data :ButtonData}) {
    const { pending } = useFormStatus();

    return (
        <button 
        onClick={()=> data.onClick}
        disabled={pending}
        >
            {pending ? "searching...." : data.text}
        </button>
    )

}