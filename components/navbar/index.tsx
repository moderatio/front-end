import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white flex flex-row justify-center">
      <div className="items-center flex space-x-4 text-white max-w-[1200px] w-full justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/home");
          }}
        >
          <Image
            src="/assets/logo.png"
            alt="moderatio logo"
            width={93}
            height={93}
            quality={100}
          />
        </div>
        <div className="flex flex-row">
          <div className="mr-3">
            <Link href="/cases">cases</Link>
          </div>
          <div>
            <Link href="/create-case">create case</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
