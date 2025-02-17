import Image from 'next/image';
import Link from 'next/link';
/**
 * NotFound 커스텀 페이지 입니다.
 * 홈페이지로 돌아갈 수 있습니다.
 * 커스텀 tailwindcss로 min-h-screen에서 발생하는 유격을 제거
 * (min-h-screen-minus-nav)
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-minus-nav bg-white px-4">
      {/*Empty Done 이미지 활용 */}
      <Image
        src="/img/DoneLarge.png"
        alt="Not Found Character"
        width={200}
        height={200}
        className="object-contain"
      />
      <h1 className="mt-8 text-20">404 Not Found </h1>
      <p className="mt-4 text-18-bold">
        요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 border-2 border-slate-400 text-violet-600 text-20-bold rounded hover:border-violet-600 "
      >
        {' '}
        {/*데스크탑 로고이미지 활용 */}
        <Image src={'/navlogo/Large.svg'} width={151} height={41} alt="sorry" />
        <span>홈으로 이동하기</span>
      </Link>
    </div>
  );
}
