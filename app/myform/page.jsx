import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/app/myform/data-table";
import { columns } from "@/app/myform/columns";
import { getUserId } from "@/lib/sessions"; 

export default async function MyFormPage() {
  const userId = await getUserId();

  const form = await db.form.findMany({
    where: {
      userId: userId,
    },
  });
  const question = await db.question.findMany();
  const response = await db.response.findMany();

  const data = form.map((f) => {
    const q = question.filter((q) => q.formId === f.id);

    const date = new Date(f.CreatedAt).toLocaleDateString("fr-FR");

    return {
      name: f.name,
      CreatedAt: date,
      questions: q.length,
      reponses: response.filter((r) => r.formId === f.id).length,
      id: f.id,
    };
  });

  return (
    <div>
      {data.length === 0 && (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Aucun formulaire trouvé
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Vous n'avez pas encore créé de formulaire. Créez votre premier
              formulaire dès maintenant.
            </p>
            <div className="mt-6">
              <Link href="/formbuilder">
                <Button>Créer un formulaire</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
