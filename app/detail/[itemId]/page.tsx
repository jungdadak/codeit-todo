import Image from 'next/image';
export default async function DetailPage({
  params,
}: {
  params: { itemId: string };
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { itemId } = await params;

  const res = await fetch(`${BASE_URL}/api/detail/${itemId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <h1>❌ 데이터 불러오기 실패</h1>;
  }

  const todo = await res.json();

  return (
    <div className="w-full p-2">
      {/* todo 제목 */}
      <div className="w-full mb-8">
        <div className="bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-slate-900 py-3 px-4">
          <Image src={'/ic/todo.svg'} alt="todo-list" width={32} height={32} />
          <h1 className="text-xl ml-4 underline">{todo.name}</h1>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4">
        {/* 왼쪽 이미지 영역 */}
        <div className="w-full lg:max-w-sm">
          <div className="w-full h-[311px] bg-slate-100 border-2 border-dashed border-slate-300 flex justify-center items-center rounded-2xl relative">
            <Image
              src="/img/img.svg"
              alt="upload"
              width={64}
              height={64}
              className="opacity-50"
            />
            <button className="absolute bottom-4 right-4 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300">
              <Image src="/ic/grayPlus.svg" alt="add" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 오른쪽 메모 영역 */}
        <div className="w-full ">
          <div
            className="w-full h-[311px] bg-cover bg-center rounded-2xl shadow-md mb-8 relative"
            style={{ backgroundImage: 'url(/img/memo.png)' }}
          >
            <div className="absolute inset-0 flex flex-col p-6">
              <h3 className="text-yellow-800 font-medium mb-4 text-center">
                Memo
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <textarea
                  className="w-full h-full bg-transparent resize-none focus:outline-none text-center placeholder:text-gray-600"
                  placeholder="메모를 추가해 보세요"
                  value={todo.memo || ''}
                  style={{
                    height: '200px',
                    overflowY: 'auto',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-slate-700 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-slate-900">
              <Image src="/ic/check.svg" alt="check" width={16} height={16} />
              수정 완료
            </button>
            <button className="flex items-center gap-2 bg-rose-600 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-rose-800">
              <Image src="/ic/x.svg" alt="delete" width={16} height={16} />
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
