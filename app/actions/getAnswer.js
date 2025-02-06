"use server";

import { saveResponse } from "@/lib/answer-services";
import { redirect } from "next/navigation";

export async function getAnswer(formData, slug) {
  const answers = Object.fromEntries(formData.entries());
  console.log("Réponses de l'utilisateur :", answers);
  await saveResponse(slug, answers);
  redirect(`/thanks`);
}
