import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MyFormPage() {
  const form = await db.form.findMany();
  const question = await db.question.findMany();

  const data = form
    .map((form) => {
      return {
        ...form,
        questions: question.filter((question) => question.formId === form.id),
      };
    })
    .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));

  return (
    <div>
      <Header />

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
                <Button variant="link">Créer un formulaire</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {data.map((form) => (
            <Card size="2xl" className="w-auto h-auto m-6 ">
              <CardHeader>
                <CardTitle>{form.name}</CardTitle>
                <CardDescription>
                  {form.CreatedAt
                    ? new Date(form.CreatedAt).toLocaleDateString("fr-FR")
                    : "Date inconnue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Nombre de question : {form.questions.length} </p>
              </CardContent>
              <CardFooter>
                <p>Nombre de personnes qui ont répondu au questionnaire</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
