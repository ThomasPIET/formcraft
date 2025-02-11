import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const form = await db.form.findMany({
      orderBy: {
        CreatedAt: 'desc'
      }
    });
    const question = await db.question.findMany();
    const response = await db.response.findMany();

    const data = form.map((f) => {
      const q = question.filter((q) => q.formId === f.id);
      const date = new Date(f.CreatedAt).toLocaleDateString("fr-FR");

      return {
        name: f.name,
        CreatedAt: date,
        questions: q.length,
        reponses: response.filter((r) => r.formId === f.id).length,
        id: f.id,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur dans GET /api/form :", error);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
