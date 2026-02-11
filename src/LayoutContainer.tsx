import { type ReactElement } from "react";

interface LayoutContainerProps {
  children: ReactElement;
}

function LayoutContainer({ children } : LayoutContainerProps) {
  return (
    <div className="w-full h-screen">
        {children}
    </div>
  );
}

export default LayoutContainer;