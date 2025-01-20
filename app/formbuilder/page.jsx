"use client";

import Header from "@/components/header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import saveForm from "@/lib/saveForm";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Pencil, X } from "lucide-react";

export default function FormBuilderPage() {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const { toast } = useToast();

  const addQuestion = () => {
    if (!formTitle.trim() || formTitle === "") {
      toast({
        variant: "destructive",
        description: " ⚠️ Il faut donner un titre à votre formulaire",
      });
      return;
    }

    const newQuestion = {
      id: Date.now(),
      label: "",
      type: "TEXT",
      options: ["", ""],
    };
    console.log("newQuestion :", newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
    console.log("updatedQuestions :", updatedQuestions);
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
      label: question.label.trim() || "",
      options: (question.options || []).filter(
        (option) => option.trim() !== "",
      ),
    }));

    try {
      await saveForm(formTitle, sanitizedQuestions);
      toast({ description: " ✅ Formulaire créé avec succès !" });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          " ⚠️ Une erreur est survenue lors de la création du formulaire.",
      });
      console.error("Erreur lors de la création du formulaire :", error);
    }
    redirect("/myform");
  };

  return (
    <div>
      <Header />

      {questions.length === 0 && (
        <div className="flex flex-col items-center justify-center  min-h-screen overflow-hiddender  ">
          <h1 className="mb-8 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Bienvenue sur la page de création de formulaire
          </h1>
          <p className="mb-10 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center">
            Commencez par ajouter un titre à votre formulaire, puis ajoutez des
            questions.
          </p>
          <Input
            className="mb-8 max-w-lg focus-visible:ring-0"
            value={formTitle}
            autoFocus
            type="text"
            placeholder="Donnez un titre à votre formulaire"
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <div className="-z-10 absolute bg-black rounded-full h-40 w-40 top-10 left-15" />
          <div className="-z-10 absolute bg-yellow-600 rounded-full h-40 w-40 bottom-20 right-10" />
          <div className="-z-10 absolute bg-blue-500 rounded-full h-40 w-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="-z-10 absolute bg-red-800 rounded-full h-40 w-40 bottom-5 left-1/4" />

          <Button size="lg" onClick={addQuestion}>
            Commencer
          </Button>
        </div>
      )}
      {questions.length > 0 && (
        <div className="flex min-h-[calc(100vh-48px)] mt-4  items-center justify-center   ">
          <div className="grid w-auto gap-12 px-20">
            <div className="flex">
              <input
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-min placeholder-black  text-3xl font-bold border-b-2 focus:border-gray-300  focus:outline-none py-2 px-1"
                value={formTitle}
                spellCheck="false"
              />
              <Pencil className="h-auto text-gray-500" />
            </div>

            {questions.map((question, index) => (
              <div key={question.id}>
                <Label className="text-lg">Question {index + 1}</Label>

                <Input
                  className="bg-gray-200 focus-visible:ring-0 my-2 text-black placeholder-black"
                  type="text"
                  autoFocus
                  placeholder={`Question`}
                  value={question.label}
                  onChange={(e) => {
                    updateQuestions(index, e.target.value);
                  }}
                />

                <Select
                  onValueChange={(value) => updateQuestionType(index, value)}
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
                          className="hover:bg-gray-200 "
                          onClick={() => removeOption(index, optionIndex)}
                        >
                          <X />
                        </Button>
                      </div>
                    ))}

                    {question.options.length < 4 &&
                      question.type === "MULTIPLE_CHOICE" && (
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

            {questions.length > 0 && (
              <Button
                variant="outline"
                className="font-semibold"
                onClick={addQuestion}
                size="lg"
              >
                Ajouter une question
              </Button>
            )}
            {questions.length > 0 && (
              <Button className="font-semibold" onClick={handleSaveForm}>
                Créer le sondage
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
