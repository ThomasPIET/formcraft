import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function MyFormSlugPage({ params }) {
  const { slug } = params;

  const form = await db.form.findUnique({
    where: {
      id: slug,
    },
    include: {
      questions: true,
      Response: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!form) {
    return (
      <div className="mx-auto px-4 py-8 max-w-screen-md">
        <h1 className="text-2xl font-bold">Formulaire introuvable</h1>
      </div>
    );
  }

  // Construire la map des réponses
  const answersMap = new Map();
  form.Response.forEach((response) => {
    const answers = response.answers;
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (!answersMap.has(questionId)) {
        answersMap.set(questionId, []);
      }
      answersMap.get(questionId).push(answer);
    });
  });

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-md">
      <h1 className="text-4xl font-bold mb-6">{form.name}</h1>

      <div className="space-y-4">
        {form.questions.map((question) => {
          const questionAnswers =
            answersMap.get(`question-${question.id}`) || [];
          const totalResponses = questionAnswers.length;

          return (
            <Card key={question.id} className="p-4">
              <CardContent>
                <h2 className="font-semibold text-2xl mb-4">
                  {question.label}
                </h2>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Réponses ({totalResponses})
                  </h3>

                  {question.type === "MULTIPLE_CHOICE" ? (
                    <div className="space-y-4">
                      {question.options.map((option) => {
                        const optionCount = questionAnswers.filter(
                          (answer) => answer === option
                        ).length;
                        const percentage =
                          totalResponses > 0
                            ? Math.round((optionCount / totalResponses) * 100)
                            : 0;

                        return (
                          <div key={option} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{option}</span>
                              <span className="font-medium">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                            <p className="text-sm text-gray-500">
                              {optionCount} réponse
                              {optionCount > 1 ? "s" : ""}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {questionAnswers.map((answer, idx) => (
                        <li
                          key={idx}
                          className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition"
                        >
                          {answer}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
