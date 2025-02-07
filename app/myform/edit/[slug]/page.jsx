"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getForm, updateForm } from "@/lib/form-services";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

export default function FormBuilderPage({ params }) {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const { toast } = useToast();

  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchForm() {
      const fetchedForm = await getForm(slug);
      if (fetchedForm) {
        setForm(fetchedForm);
        setFormTitle(fetchedForm.name || "");
        setQuestions(fetchedForm.questions || []);
      }
    }
    fetchForm();
  }, [slug]);

  const addQuestion = () => {
    if (!formTitle.trim()) {
      toast({
        variant: "destructive",
        description: "⚠️ Il faut donner un titre à votre formulaire",
      });
      return;
    }

    const newQuestion = {
      id: Date.now(),
      label: "",
      type: "TEXT",
      options: ["", ""],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length >= 4) return;
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const updateQuestions = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].label = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSaveForm = async () => {
    const hasEmptyQuestion = questions.some(
      (question) => !question.label.trim(),
    );
    if (hasEmptyQuestion) {
      toast({
        variant: "destructive",
        description:
          "⚠️ Veuillez compléter toutes les questions avant de sauvegarder le formulaire.",
      });
      return;
    }

    const hasEmptyOption = questions.some(
      (question) =>
        question.type === "MULTIPLE_CHOICE" &&
        question.options.some((option) => !option.trim()),
    );
    if (hasEmptyOption) {
      toast({
        variant: "destructive",
        description:
          "⚠️ Veuillez compléter toutes les options pour les questions à choix multiple.",
      });
      return;
    }

    const sanitizedQuestions = questions.map((question) => ({
      ...question,
      label: question.label.trim(),
      options: (question.options || []).filter(
        (option) => option.trim() !== "",
      ),
    }));

    try {
      console.log("update", slug, formTitle, sanitizedQuestions);
      await updateForm(slug, formTitle, sanitizedQuestions);
      toast({ description: "✅ Formulaire modifié avec succès !" });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "⚠️ Une erreur est survenue lors de la modification du formulaire.",
      });
      console.error("Erreur lors de la modification du formulaire :", error);
    }

    redirect("/myform", "push");
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center flex-col my-10">
        <Card className="grid justify-center mx-auto gap-12 py-4 px-20">
          <CardTitle className="flex text-3xl border-b py-4 font-bold items-center">
            {formTitle}
          </CardTitle>

          {questions.map((question, index) => (
            <div key={question.id} className="border-b p-4 rounded-md pb-8">
              <Label className="text-lg">Question {index + 1}</Label>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  className="bg-gray-200 focus-visible:ring-0 my-2 text-black placeholder-black"
                  type="text"
                  placeholder="Écrivez votre question"
                  value={question.label}
                  onChange={(e) => updateQuestions(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  className="hover:bg-gray-200"
                  onClick={() => removeQuestion(index)}
                >
                  <X />
                </Button>
              </div>

              <Select
                onValueChange={(value) => updateQuestionType(index, value)}
                value={question.type}
              >
                <SelectTrigger className="w-[180px] mt-1.5">
                  <SelectValue placeholder="Réponse libre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEXT">Réponse libre</SelectItem>
                  <SelectItem value="MULTIPLE_CHOICE">
                    Choix multiple
                  </SelectItem>
                </SelectContent>
              </Select>

              {question.type === "MULTIPLE_CHOICE" && (
                <div className="mt-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <Input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          updateOption(index, optionIndex, e.target.value)
                        }
                      />
                      <Button
                        variant="ghost"
                        className="hover:bg-gray-200"
                        onClick={() => removeOption(index, optionIndex)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}

                  {question.options.length < 4 && (
                    <Button
                      variant="outline"
                      onClick={() => addOption(index)}
                      className="mt-1"
                    >
                      Ajouter une option
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="font-semibold"
            onClick={addQuestion}
            size="lg"
          >
            Ajouter une question
          </Button>

          {questions.length > 0 && (
            <Button
              size="lg"
              className="font-semibold mb-6"
              onClick={handleSaveForm}
            >
              Modifier le sondage
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
