import type { ReactNode } from "react";

// Same button, different labels and actions, depending on the props we pass
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
};

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const className = variant === "secondary" ? "secondary-button" : undefined;

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
