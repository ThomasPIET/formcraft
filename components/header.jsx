import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 border-b-gray-300 bg-white border top-0 z-50 sticky ">
      <div className=" mx-10 flex justify-between">
        <a href="/" className="text-2xl font-bold">
          FormCraft
        </a>
        <Button variant="outline" asChild>
          <Link href="/formbuilder">Create Form</Link>
        </Button>
      </div>
    </header>
  );
}
