import { getForm } from "@/lib/form-services";
import { Card } from "@/components/ui/card";

export default async function MyFormSlugPage({ params }) {
  const { slug } = await params;
  const form = await getForm(slug);
  console.log(form.questions);

  return (
    <div className="flex space-x-4">
      <Card className="flex-1"> See my Post: {slug}</Card>
      <Card className="flex-1"> See my Post: {slug}</Card>
      <Card className="flex-1"> See my Post: {slug}</Card>
    </div>
  );
}
