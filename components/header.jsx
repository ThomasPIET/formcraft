import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 border-b-gray-300 bg-white border top-0 z-50 sticky ">
      <div className=" mx-10 flex justify-between">
        <h1 className="text-2xl font-bold">FormCraft</h1>
        <Button variant="outline" asChild>
          <Link href="/formbuilder">Create Form</Link>
        </Button>
      </div>
    </header>
  );
}
