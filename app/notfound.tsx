import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Image
        src="/img/DoneLarge.png"
        alt="Not Found Character"
        width={200}
        height={200}
        className="object-contain"
      />
      <h1 className="mt-8 text-3xl font-bold text-gray-800">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-4 text-lg text-gray-600 text-center">
        요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        홈으로 이동하기
      </Link>
    </div>
  );
}
