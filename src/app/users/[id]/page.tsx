import UserProfilePage from './PageClient';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <UserProfilePage id={id} />;
}
