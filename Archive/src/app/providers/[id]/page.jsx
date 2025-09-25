import ProvidersProfilePage from './PageClient';

export default async function Page({ params }) {
  const { id } = await params; // 👈 await here

  return <ProvidersProfilePage id={id} />;
}
