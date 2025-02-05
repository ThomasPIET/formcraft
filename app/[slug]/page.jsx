import { getForm } from "@/lib/form-services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { saveResponse } from "@/lib/answer-services";

export default async function AnswerPage({ params }) {
  const { slug } = await params;
  const form = await getForm(slug);

  async function getAnswer(formData) {
    "use server";

    const answers = Object.fromEntries(formData.entries());
    console.log("Réponses de l'utilisateur :", answers);

    await saveResponse(slug, answers);
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={getAnswer}>
            {form.questions.map((question) => (
              <div key={question.id} className="mb-6">
                <Label className="block mb-2 text-lg font-medium">
                  {question.label}
                </Label>

                {question.type === "TEXT" && (
                  <Input
                    type="text"
                    required
                    name={`question-${question.id}`}
                    placeholder="Votre réponse..."
                    className="w-full focus-visible:ring-0"
                  />
                )}

                {question.type === "MULTIPLE_CHOICE" && (
                  <RadioGroup
                    name={`question-${question.id}`}
                    className="flex flex-col space-y-2"
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={`${question.id}-${index}`}
                        />
                        <Label htmlFor={`${question.id}-${index}`}>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <Button type="submit">Valider</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
