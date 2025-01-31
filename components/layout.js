"use client";

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();
  const noLayoutPages = ["/login", "/register"];

  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Toaster />
      <main>
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute bg-[#F59E0B] rounded-full h-[500px] w-[500px] top-[-10%] left-[-10%] opacity-30" />
          <div className="absolute bg-[#FBBF24] rounded-full h-[600px] w-[600px] bottom-[-20%] right-[-15%] opacity-40" />
          <div className="absolute bg-[#FDE68A] rounded-full h-[700px] w-[700px] top-[30%] left-[25%] opacity-50" />
        </div>

        {children}
      </main>
    </>
  );
}
