import ProvidersProfilePage from './PageClient';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <ProvidersProfilePage id={id} />;
}
