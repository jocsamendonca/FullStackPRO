import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 8,
        color: "#FFF",
        backgroundColor: disabled ? "#FAFAFA" : "#121212",
      }}
    >
      {children}
    </button>
  );
}
