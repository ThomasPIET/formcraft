import { getForm } from "@/lib/form-services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default async function AnswerPage({ params }) {
  const { slug } = await params;
  const form = await getForm(slug);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            {form.questions.map((question) => (
              <div key={question.id} className="mb-6">
                <Label className="block mb-2 text-lg font-medium">
                  {question.label}
                </Label>

                {question.type === "TEXT" && (
                  <Input
                    type="text"
                    name={`question-${question.id}`}
                    placeholder="Votre réponse..."
                    className="w-full"
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
