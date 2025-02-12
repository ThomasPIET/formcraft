"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  const pathname = usePathname();
  const noLayoutPages = ["/login", "/register"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user");   
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        setIsLoggedIn(!!data.userId);
      } catch (e) {
        console.error(e);
      }
    };
    checkAuth();
  }, []);

  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
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
