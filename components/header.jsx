import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "@/lib/user-services";

export default function Header() {
  return (
    <header className="py-4  border-b-gray-300 bg-white border w-100% top-0 z-50 sticky ">
      <div className=" mx-10 flex justify-between">
        <a href="/" className="text-2xl font-cdbold">
          FORMCRAFT
        </a>

        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/myform">Voir mes formulaires</Link>
          </Button>

          <Button asChild>
            <Link href="/formbuilder" className="text-lg">
              Créer un formulaire
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => logout()}>
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
