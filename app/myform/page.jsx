"use client";

//Je dois faire une api finalement (relou)

import Header from "@/components/header";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";

export default function MyFormPage() {
  const [forms, setForm] = useState([]);

  const getForm = async () => {
    const data = await db.form.findMany();
    setForm(data);

    console.log(data);

    useEffect(() => {
      getForm();
    }, []);

    console.log(data);
  };

  return (
    <div>
      <Header />
      <h1>MyFormPage</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>{form.name}</li>
        ))}
      </ul>
    </div>
  );
}
