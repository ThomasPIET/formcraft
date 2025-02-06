"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function ThanksPage() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  const handleAnimation = () => {
    const end = Date.now() + 4000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

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

  useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Merci pour votre participation
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Votre réponse a bien été enregistrée.
        </p>
        <p className="mt-4 text-xl text-gray-600">
          Vous serez redirigé dans {count} seconde{count > 1 && "s"}...
        </p>
      </div>
    </div>
  );
}
