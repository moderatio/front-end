import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white flex flex-row justify-center">
      <div className="items-center flex space-x-4 text-white max-w-[1200px] w-full justify-between">
        <Link href="/home">
          <div className="cursor-pointer">
            <Image
              src="/assets/logo.png"
              alt="moderatio logo"
              width={93}
              height={93}
              quality={100}
            />
          </div>
        </Link>
        <div className="flex flex-row">
          <Link href="/cases">
            <div className="p-3 m-3 rounded bg-dark-blue text-white font-bold">
              cases
            </div>
          </Link>
          <Link href="/create-case">
            <div className="p-3 m-3 rounded bg-dark-blue text-white font-bold">
              create case
            </div>
          </Link>
          <div className="p-3 m-3 rounded bg-dark-blue text-white font-bold flex flex-row">
            <Image
              src="/assets/solid_wallet.svg"
              width={18}
              height={18}
              alt="wallet icon"
            />
            <span className="ml-3">connect wallet</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
