import { getForm } from "@/lib/form-services";

export default async function MyFormSlugPage({ params }) {
  const { slug } = await params;
  const form = await getForm(slug);
  console.log(form.questions);

  return <div>See my Post: {slug}</div>;
}
