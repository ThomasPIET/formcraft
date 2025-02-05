export default async function MyFormSlugPage({ params }) {
  const slug = (await params).slug;

  return <div>See my Post: {slug}</div>;
}
