import { ReactNode } from "react";

type PropsContainer = {
  children: ReactNode;
};
const Container = ({ children }: PropsContainer) => {
  return (
    <div className="min-h-screen p-4 w-screen bg-yellow-50 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Container;
