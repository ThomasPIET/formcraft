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
        {children}
        </main>
    </>
  );
}
