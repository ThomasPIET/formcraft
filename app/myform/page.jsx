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

export default async function MyFormPage() {
  const form = await db.form.findMany();
  const question = await db.question.findMany();

  const data = form.map((form) => {
    return {
      ...form,
      questions: question.filter((question) => question.formId === form.id),
    };
  });

  return (
    <div>
      <Header />

      {data.length === 0 && <p>Vous n'avez pas encore de formulaire</p>}

      {data.length > 0 && (
        <div className="grid grid-cols-4">
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
                <p>Nombre de questions </p>
              </CardContent>
              <CardFooter>
                <p>Nombred de personnes qui ont réondu au questionnaire</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
