import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
export default function Page() {
  return (
    <div>
      <header className="py-4 border-b-gray-300 border">
        <div className=" mx-10 flex justify-between  border border-red-500">
          <h1 className="text-2xl font-bold">FormCraft</h1>
          <Button className={buttonVariants({ variant: "outline" })} asChild>
            <Link className="text-black" href="/formbuilder">
              Create Form
            </Link>
          </Button>
        </div>
      </header>
      <h1>Page</h1>
    </div>
  );
}
