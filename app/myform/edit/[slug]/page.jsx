export default async function EditPage({ params }) {
  const slug = (await params).slug;

  return <div>Edit my Post: {slug}</div>;
}
