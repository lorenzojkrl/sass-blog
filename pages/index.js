// import Image from "next/image";
// import HeroImage from "../public/hero.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-screen h-screen overflow-hidden flex flex-col items-center	">
      <section className="min-w-max flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-2xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 text-slate-900/90">
          AI SEO Writer
          <FontAwesomeIcon
            icon={faFeather}
            size="sm"
            className="px-2 text-slate-900/90"
          ></FontAwesomeIcon>
        </h1>
        <h4 className="text-center text-slate-900/90 md:text-left text-lg mt-5 md:pl-8">
          AI Support For Your SEO Content
        </h4>
      </section>
      <div className="flex flex-col align-middle justify-center items-center relative">
        {/* <Image src={HeroImage} alt="Hero" fill className="absolute" /> */}
        <div className="relative text-white px-20 py-5 text-center  bg-slate-900/90 rounded-md backdrop-blur-sm">
          <Logo />
          <p className="pb-3">AI Support For Your SEO Content.</p>
          <Link href="/post/new" className="btn ">
            Let&apos;s Start
          </Link>
        </div>
      </div>
    </div>
  );
}
