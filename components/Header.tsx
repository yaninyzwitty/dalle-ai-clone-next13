import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      {/* le */}
      <div className="flex space-x-2 items-center ">
        <Image
          src={"https://links.papareact.com/4t3"}
          alt="logo"
          height={30}
          width={30}
        />
        <div>
          <h1 className="font-bold">
            WITTY_FAM <span className="text-violet-500 ">AI</span>
          </h1>
          Image generator
          <h2 className="text-xs">
            Powered by DALLE.2 , CHATgpt & MICROSOFT AZURE
          </h2>
        </div>
      </div>
      {/* r */}
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link
          href={`https://github.com/yaninyzwitty`}
          className="px-2 font-light text-right"
        >
          Check my github repository
        </Link>
        <Link
          href={`https://www.linkedin.com/in/ian-mwangi-a71258242/`}
          className="px-2 font-light"
        >
          Check my linkedin profile
        </Link>
      </div>
    </header>
  );
}

export default Header;
