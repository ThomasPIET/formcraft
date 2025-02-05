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

export default function Header() {
  return (
    <header className="py-4  border-b-gray-300 bg-white border w-100% top-0 z-50 sticky ">
      <div className=" mx-10 flex justify-between">
        <a href="/" className="text-2xl font-cdbold">
          FORMCRAFT
        </a>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/formbuilder" className="text-lg">
              Créer un formulaire
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
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
              <DropdownMenuItem onClick={() => redirect("/myform", "push")}>
                Mes formulaires
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
