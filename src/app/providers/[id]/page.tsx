import ProvidersProfilePage from './PageClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProvidersProfilePage id={id} />;
}
