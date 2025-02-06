"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/lib/sessions";

async function saveForm(formName, questions) {
  const userId = await getUserId();

  try {
    await db.form.create({
      data: {
        name: formName,
        userId: userId,
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
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans formServices :", error);
    throw new Error("Erreur dans la fonction formServices");
  }
}

async function checkTitle(title) {
  return db.form.findUnique({
    where: {
      name: title,
    },
  });
}

async function deleteForm(formId) {
  try {
    await db.$transaction(async (prisma) => {
      await prisma.question.deleteMany({
        where: { formId },
      });

      await prisma.form.delete({
        where: {
          id: formId,
        },
      });
    });
  } catch (error) {
    console.error("Erreur lors de la suppression dans formServices :", error);
    throw new Error("Erreur dans la fonction formServices");
  }
}

async function getForm(formId) {
  return db.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      questions: true,
    },
  });
}

export { saveForm, deleteForm, checkTitle, getForm };
