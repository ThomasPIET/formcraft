"use client";

import { useState, useEffect, use } from "react";
import { getForm } from "@/lib/form-services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAnswer } from "@/app/actions/getAnswer";

export default function AnswerPage({ params }) {
  const resolvedParams = use(params);

  const { slug } = resolvedParams;
  const [form, setForm] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchForm() {
      const fetchedForm = await getForm(slug);
      setForm(fetchedForm);
    }
    fetchForm();
  }, [slug]);

  const updateProgress = () => {
    const formElement = document.getElementById("answer-form");
    if (!formElement || !form) return 0;

    const formData = new FormData(formElement);
    let answeredCount = 0;

    form.questions.forEach((question) => {
      const answer = formData.get(`question-${question.id}`);
      if (answer && answer.toString().trim() !== "") {
        answeredCount++;
      }
    });

    return Math.floor((answeredCount / form.questions.length) * 100);
  };

  const handleInputChange = () => {
    const newProgress = updateProgress();
    setProgress(newProgress);
  };

  if (!form) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{form.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress className="mb-4" value={progress} />
          <form
            id="answer-form"
            action={(formData) => getAnswer(formData, slug)}
          >
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
                    onChange={handleInputChange}
                  />
                )}

                {question.type === "MULTIPLE_CHOICE" && (
                  <RadioGroup
                    name={`question-${question.id}`}
                    className="flex flex-col space-y-2"
                    onChange={handleInputChange}
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
