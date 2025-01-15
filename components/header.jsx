import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 border-b-gray-300 bg-white border top-0 z-50 sticky ">
      <div className=" mx-10 flex justify-between">
        <a href="/" className="text-2xl font-bold">
          FormCraft
        </a>

        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/formbuilder">Créer un formulaire</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/myform">Voir mes formulaires</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
