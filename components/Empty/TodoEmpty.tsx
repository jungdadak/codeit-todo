import Image from 'next/image';

export default function TodoEmpty() {
  return (
    <>
      {' '}
      <Image
        src={'/img/TodoSmall.png'}
        width={120}
        height={120}
        alt="할일없어요?"
        className="m-auto mt-5 block lg:hidden"
      />{' '}
      <Image
        src={'/img/TodoLarge.png'}
        width={240}
        height={240}
        alt="할일없어요?"
        className="m-auto mt-5 hidden lg:block"
      />
      <p className="text-16 p-5">
        할 일이 없어요.
        <br />
        TODO를 새롭게 추가해 주세요!
      </p>
    </>
  );
}
