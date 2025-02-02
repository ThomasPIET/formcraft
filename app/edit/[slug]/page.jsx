export default async function EditPage({ params }) {
  const slug = (await params).slug;

  return <div>My Post: {slug}</div>;
}
