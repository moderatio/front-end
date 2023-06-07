import Link from "next/link";
import Image from "next/image";
import { useAccount } from "wagmi";
import Modal from "../Modal";
import { useState } from "react";
import { Wallets } from "../Wallets";

const Navbar = () => {
  const { address, status } = useAccount();
  const [open, setOpen] = useState(false);

  return (
    <>
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
            <div
              className="p-3 m-3 rounded bg-dark-blue text-white font-bold flex flex-row cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Image
                src="/assets/solid_wallet.svg"
                width={18}
                height={18}
                alt="wallet icon"
              />

              <span className="ml-3">
                {status === "connected" && address
                  ? `${String(address).slice(0, 3)}...${String(address).slice(
                      -3
                    )}`
                  : "connect wallet"}
              </span>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <Wallets />
      </Modal>
    </>
  );
};

export default Navbar;
