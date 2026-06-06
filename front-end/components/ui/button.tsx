import { ButtonData } from "@/types";
import { CSSProperties } from "react";
import { useFormStatus } from "react-dom";

const defaultBtnStyle: CSSProperties = {
  padding: "0.8rem 3rem",
  borderRadius: "0.4rem",
  cursor: "pointer",
  width: "100%",
};

export function Button({ data }: { data: ButtonData }) {
  const { pending } = useFormStatus();

  const btnStyle = { ...defaultBtnStyle, ...data.style };

  const Icon = data?.icons;

  return (
    <button
      onClick={() => data.onClick}
      disabled={pending}
      type={data.type}
      style={btnStyle}
    >
        {Icon && <Icon size={30} />}
        {pending ? "submitting...." : data.text}
    </button>
  );
}
