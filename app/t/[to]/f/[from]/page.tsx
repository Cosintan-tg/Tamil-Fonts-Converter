import Converter from '@/app/pages/converter/Converter';

export default async function ConversionPage({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}) {
  const { from, to } = await params;
  return <Converter fontFrom={from} fontTo={to} />;
}
