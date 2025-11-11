import type { ReactNode } from "react";
import { textStyle } from "../App";

interface NavigationProps {
    children?: ReactNode;
}

export function Navigation({ children }: NavigationProps ) {
    return (
        <div className="text-white text-2xl p-12 absolute bottom-0 flex justify-between w-full tracking-tight" 
        style={textStyle}>
            {children}
        </div>
    )

}