"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { MoveDown } from "lucide-react";
import DisplayForm from "@/components/displayForm";

export default function HomePage() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col my-10 md:my-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl px-4 py-12 md:py-24 mx-auto text-center"
        >
          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 pb-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-cdbold text-4xl sm:text-5xl md:text-6xl lg:text-8xl pt-6 sm:pt-8 md:pt-10 mb-2 sm:mb-3 md:mb-4"
            >
              FORMCRAFT
            </motion.div>
            La solution pour vos formulaires
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-600 px-4">
            Créez, partagez et analysez vos formulaires en toute simplicité. Une
            solution intuitive pour des résultats percutants.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="text-lg">
              <Link href="/formbuilder">Créer un formulaire</Link>
            </Button>
          </div>
          <Separator className="mb-20 mt-14 h-[1px] bg-gray-400" />
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Les derniers partagés
            </h2>
            <MoveDown className="w-10 h-10 animate-bounce text-gray-900" />
          </div>
          <DisplayForm />
        </motion.div>
      </div>
    </div>
  );
}
