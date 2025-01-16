"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function saveForm(formName, questions) {
  try {
    await db.form.create({
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

    revalidatePath("/myform");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans saveForm :", error);
    throw new Error("Erreur dans la fonction saveForm");
  }
}
