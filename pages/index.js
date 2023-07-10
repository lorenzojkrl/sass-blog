import Image from "next/image";
import HeroImage from "../public/hero.webp";
import { Logo } from "../components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="Hero" fill className="absolute" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
        <p>Some text on this sass product.</p>
        <Link
          href="/post/new"
          className="bg-green-500 trackinf-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block"
        >
          Begin
        </Link>
      </div>
      {/* PW: Auth0test */}
    </div>
  );
}
