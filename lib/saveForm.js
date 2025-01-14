"use server";

import { db } from "@/lib/db";

export default async function saveForm(formName, questions) {
  "use server";

  return db.form.create({
    data: {
      name: formName,
      questions: {
        create: questions.map((question) => ({
          label: question.label,
          type: question.type,
          options: question.options,
        })),
      },
    },
    include: {
      questions: true,
    },
  });
}
