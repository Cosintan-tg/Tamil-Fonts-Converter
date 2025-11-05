import FontPage from '@/app/pages/fontPage/FontPage';

export default async function FontDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <FontPage fontName={name} />;
}
