import { ReactNode, ButtonHTMLAttributes } from "react";

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string | ReactNode;
  children?: ReactNode;
};

const Button = ({ text, className, children, ...rest }: PropsButton) => {
  return (
    <button
      className={`flex justify-center font-bold px-4 py-2 rounded border-4 items-center ${className}`}
      {...rest}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
