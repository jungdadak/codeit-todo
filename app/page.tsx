import SearchBox from '@/components/SearchBox/SearchBox';
import TodoSection from '@/components/TodoSection';
import Image from 'next/image';

/**
 * 목표 : SSR로 데이터를 꽂아넣은 html 랜더링하기
 * todoclient, doneclient 제외하고
 */
export default async function Home() {
  return (
    <div className="text-slate-900">
      <SearchBox />
      <div className="flex flex-col lg:flex-row justify-center gap-5 mt-10">
        <section className="text-center w-full lg:w-1/2">
          <Image src={'/img/todo.svg'} alt="todo" width={101} height={36} />
          <TodoSection type="todo" />
        </section>
        <section className="text-center w-full lg:w-1/2">
          <Image src={'/img/done.svg'} alt="done" width={101} height={36} />
          <TodoSection type="done" />
        </section>
      </div>
    </div>
  );
}
