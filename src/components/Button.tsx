import { ReactNode, ButtonHTMLAttributes } from "react";

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string | ReactNode;
  children?: ReactNode;
};

const Button = ({ text, className, children, ...rest }: PropsButton) => {
  return (
    <button
      className={`flex justify-center font-bold font-oswald px-4 py-2 rounded border-4 border-black items-center hover:bg-yellow-400 ${className}`}
      {...rest}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
