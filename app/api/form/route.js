import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const forms = await db.form.findMany();
    const questions = await db.question.findMany();
    const responses = await db.response.findMany();

    const data = forms.map((form) => {
      const filteredQuestions = questions.filter(
        (question) => question.formId === form.id
      );


      return {
        id: form.id,
        name: form.name,
        questions: filteredQuestions.length,
        responses: responses.filter((r) => r.formId === form.id).length,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur dans GET /api/form :", error);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
