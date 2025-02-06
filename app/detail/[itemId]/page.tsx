export default async function DetailPage({
  params,
}: {
  params: { itemId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/details/${params.itemId}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) return <h1>데이터를 불러오는 중 오류 발생</h1>;

  const data = await res.json();

  return (
    <div>
      <h1>할 일 상세 페이지</h1>
      <p>이름: {data.name}</p>
      <p>메모: {data.memo || '없음'}</p>
      <p>완료 여부: {data.isCompleted ? '✅ 완료됨' : '❌ 미완료'}</p>
    </div>
  );
}
