"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThanksPage() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Merci pour votre participation
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Votre réponse a bien été enregistrée.
        </p>
        <p>
          Vous serez redirigé dans {count} seconde{count > 1 && "s"}...
        </p>
      </div>
    </div>
  );
}
