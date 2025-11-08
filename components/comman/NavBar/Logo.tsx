import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <div className="shrink-0">
      <Link href={"/"}>
        <Image
            src={"/logo.png"}
            width={200}
            height={60}
            alt="Way to India Logo"
            className="cursor-pointer w-32 h-auto sm:w-40 md:w-48 lg:w-52 xl:w-56 transition-all duration-200"
            priority
        />
        </Link>
    </div>
  );
};

export default Logo;
