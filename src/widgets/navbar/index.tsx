import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "./items";
import ModeToggle from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="z-10 h-12 min-w-screen fixed flex items-center justify-between px-8 my-2 font-bold text-xl">
      <Image src="/logo.png" alt="logo" width={200} height={100} priority />
      <div className="flex gap-8  h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {navItems.map((item, index) => {
          return (
            <Link
              href={item.relativePath}
              key={index}
              className="h-full flex items-center px-2 hover:bg-white duration-500 rounded"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Link href={"/auth"}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </div>
  );
}
