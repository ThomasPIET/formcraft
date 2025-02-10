"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function DisplayForm() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch("/api/form");
      const data = await response.json();
      setForms(data);
    };
    fetchForms();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {forms.map((form) => (
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
              <p>Créé le {form.CreatedAt}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
