import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/hero.png";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const Hero = () => {
  const { t } = useTranslation("common");

  return (
    <Container className="flex flex-wrap ">
      <div className="flex items-center w-full lg-halveWidth ">
        <div className="max-w-2xl mb-8">
          <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg-heading">
            {t("hero_title")}
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 lg-text-xl">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col items-start">
            <Link
              href="/post/new"
              className="px-8 py-2 text-lg font-medium text-center text-white bg-indigo-700 rounded-md "
            >
              {t("hero_cta")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg-halveWidth ">
        <div style={{ position: "relative", width: "500px" }}>
          <Image
            src={heroImg}
            className={"object-cover"} // check this
            alt="Woman Working On Computer
              BY PAWEL on https://www.glazestock.com/"
            loading="eager"
            placeholder="blur"
            style={{ zIndex: "-1", objectFit: "contain" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
