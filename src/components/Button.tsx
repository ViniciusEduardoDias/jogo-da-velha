import { ReactNode } from "react";

type PropsButton = {
  text: string | ReactNode;
  onClick: () => void;
  className: string;
};

const Button = ({ text, onClick, className }: PropsButton) => {
  return (
    <button
      onClick={onClick}
      className={`flex font-bold px-4 py-2 rounded border-4 items-center ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
