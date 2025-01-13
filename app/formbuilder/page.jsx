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

export default function FormBuilderPage() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
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

  const saveForm = () => {
    console.log("questions :", questions);
  };

  return (
    <div>
      <Header />

      {questions.length < 1 && (
        <div className="flex flex-col items-center justify-center  min-h-screen overflow-hidden">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Commencer par ajouter votre première question
          </h1>
          <p className="mb-16 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center">
            Créez votre formulaire en ajoutant des questions, vous pouvez
            ensuite proposer des réponses libres ou bien laisser libre cours à
            l'imagination de vos répondants.
          </p>
          <Button size="lg" onClick={addQuestion}>
            Ajouter une question
          </Button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="flex min-h-[calc(100vh-64px)]  items-center justify-center">
          <div className="grid w-full max-w-2xl items-center gap-12">
            {questions.map((question, index) => (
              <div key={question.id}>
                <Input
                  className="h-16"
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  value={question.label}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].label = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />

                <Select
                  onValueChange={(value) => updateQuestionType(index, value)}
                >
                  <SelectTrigger className="w-[180px] mt-1.5">
                    <SelectValue placeholder="Réponse libre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT">Texte</SelectItem>
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
                          variant="destructive"
                          onClick={() => removeOption(index, optionIndex)}
                        >
                          Supprimer
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
            <div className="justify-between flex mb-[calc(20vh)] ">
              {questions.length > 0 && (
                <Button variant="outline" onClick={addQuestion}>
                  Ajouter une question
                </Button>
              )}

              {questions.length > 0 && (
                <Button onClick={saveForm}>Créer le sondage</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
