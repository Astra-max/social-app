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

  const Icon = data?.icons;

  return (
    <button
      onClick={data.onClick}
      disabled={pending}
      type={data.type}
      style={{
        ...defaultBtnStyle,
        ...data.style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      {Icon && <Icon size={20} />}
      {pending ? "Submitting..." : data.text}
    </button>
  );
}
