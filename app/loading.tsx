import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader className="animate-spin text-gray-500 w-12 h-12" />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        잠시만 기다려 주세요...
      </p>
    </div>
  );
}
