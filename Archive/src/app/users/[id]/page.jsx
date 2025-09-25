import UserProfilePage from './PageClient';

export default async function Page({ params }) {
  const { id } = await params; // 👈 await here

  return <UserProfilePage id={id} />;
}
