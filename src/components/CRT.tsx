import type { ReactNode } from "react";
import "./crt.css";

interface CRTProps {
    children: ReactNode;
  }

export default function CRT({ children }: CRTProps) {
  return <div className="crt relative overflow-hidden min-h-[100dvh] h-[100dvh]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>{children}</div>;
}
