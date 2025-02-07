'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
interface ImageUploadProps {
  initialImage: string | null;
  onImageChange: (imageUrl: string) => void;
}

export default function ImageUpload({
  initialImage,
  onImageChange,
}: ImageUploadProps) {
  // 빈 문자열이나 null인 경우 모두 null로 처리
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImage && initialImage !== '' ? initialImage : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const isEnglishFilename = (filename: string) => {
    return /^[A-Za-z0-9._-]+$/.test(filename);
  };

  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault();

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // 파일명 영문 검증
      if (!isEnglishFilename(file.name)) {
        toast({
          variant: 'destructive',
          description: '파일명은 영문만 사용 가능합니다.',
        });
        return;
      }

      // 파일 크기 검증 (5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; //
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: 'destructive',
          description: '파일 크기는 5MB 이하여야 합니다.',
        });
        return;
      }

      // 이미지 타입 검증
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          description: '이미지 파일만 업로드 가능합니다.',
        });
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('이미지 업로드 실패');
        }

        const data = await res.json();

        // 응답 데이터 검증
        if (!data.imageUrl) {
          throw new Error('이미지 URL을 받지 못했습니다.');
        }

        setImageUrl(data.imageUrl);
        onImageChange(data.imageUrl);

        toast({
          description: '이미지가 업로드되었습니다.',
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: 'destructive',
          description:
            error instanceof Error
              ? error.message
              : '이미지 업로드 중 오류가 발생했습니다.',
        });
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  return (
    <div className="w-full lg:max-w-sm">
      <div className="w-full h-[311px] bg-slate-100 border-2 border-dashed border-slate-300 flex justify-center items-center rounded-2xl relative">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Uploaded"
              fill
              className="object-cover rounded-2xl"
            />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="absolute bottom-4 right-4 p-3 bg-slate-700/70 border-2 border-black p-2 rounded-full shadow-md hover:bg-lime-300 "
            >
              <Image src="/ic/edit.svg" alt="edit" width={24} height={24} />
            </button>
          </>
        ) : (
          <>
            <Image
              src="/img/img.svg"
              alt="upload"
              width={64}
              height={64}
              className="opacity-50"
            />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="absolute bottom-4 right-4 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 disabled:opacity-50"
            >
              <Image src="/ic/grayPlus.svg" alt="add" width={24} height={24} />
            </button>
          </>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
            <div className="text-white">업로드 중...</div>
          </div>
        )}
      </div>
    </div>
  );
}
