import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="w-full px-4 bg-white h-[40px] m-auto">
      <div className="max-w-7xl mx-auto">
        <Image
          src={'/navlogo/Small.svg'}
          alt="TODO :)"
          width={71}
          height={40}
          className="block md:hidden"
        />
        <Image
          src={'/navlogo/Large.svg'}
          alt="TODO :)"
          width={151}
          height={40}
          className="hidden md:block"
        />
      </div>
    </nav>
  );
}
