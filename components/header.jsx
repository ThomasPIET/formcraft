import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "@/lib/user-services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";

export default function Header({ isLoggedIn }) {
  return (
    <header className="py-2 sm:py-4 border-b-gray-300 bg-white border w-100% top-0 z-50 sticky">
      <div className="mx-4 sm:mx-10 flex justify-between items-center">
        <a href="/" className="text-xl sm:text-2xl font-cdbold">
          FORMCRAFT
        </a>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button asChild className="hidden sm:flex">
              <Link href="/formbuilder" className="text-sm sm:text-lg">
                Créer un formulaire
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="sm:hidden"
                  onClick={() => redirect("/formbuilder", "push")}
                >
                  Créer un formulaire
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => redirect("/myform", "push")}>
                  Mes formulaires
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-4">
            <Button
              asChild
              variant="outline"
              className="text-xs sm:text-base px-2 sm:px-4"
            >
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild className="text-xs sm:text-base px-2 sm:px-4">
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
