import { db } from "@/lib/db";

async function saveResponse(formId, answers) {
  try {
    await db.response.create({
      data: {
        formId: formId,
        answers: answers,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans answerServices :", error);
    throw new Error("Erreur dans la fonction answerServices");
  }
}

export { saveResponse };
