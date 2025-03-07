"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function DisplayForm() {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("/api/form");
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des formulaires :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-600">Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {Array.isArray(forms) ? (
        forms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardContent
              className="p-6"
              onClick={() => {
                redirect(`/${form.id}`, "push");
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{form.name}</h3>
              <div className="flex justify-between text-gray-600 text-sm">
                <p>{form.questions} questions</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Aucune donnée à afficher.</p>
      )}
    </div>
  );
}
