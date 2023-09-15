import Container from "./container";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import colorWords from "../utils/colorWords";

const Hero = () => {
  const { t } = useTranslation("common");
  const title = t("hero_title");
  const wordsToColor = t("hero_title_seconds").split(" ");

  return (
    <div className="w-full bg-gray-10">
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg-halveWidth ">
          <div className="max-w-[500px] mb-8">
            <h1 className="lg:text-[64px] font-bold leading-snug tracking-tight text-white">
              {colorWords(title, wordsToColor)}
            </h1>
            <p className="lg:py-5 text-gray-5 lg-text-xl">
              {t("hero_subtitle")}
            </p>

            <div className="flex justify-between my-8">
              <Link
                href="/post/new"
                className="auth-btn hide-on-large-screens w-[175px]"
              >
                {t("G_signUp")}
              </Link>
              <Link
                href="/post/new"
                className="auth-btn bg-gray-9 hide-on-large-screens w-[175px]"
              >
                {t("G_logIn")}
              </Link>
            </div>
            <div className="flex flex-col items-start lg:pt-8 hide-on-small-screens">
              <Link
                href="/post/new"
                className="auth-btn h-[65px] w-[245px] text-[28px] font-semibold rounded-md"
              >
                {t("hero_cta")}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full lg-halveWidth">
          <div className="w-[570px] h-[700px] border border-dark-gray rounded-t-lg text-gray-4 bg-gray-7 p-4 lg:p-8">
            <div className="py-1 px-3 inline-block max-w-content bg-dark-gray-1 rounded-md text-center text-[14px] lg:text-[16px] text-cyan-5 font-bold">
              {t("demoTagline")}
            </div>
            <h2 className="demo-h1">{t("demoTitle")}</h2>
            <p className="demo-p ">{t("demoIntro")}</p>
            <h2 className="demo-h2">{t("demoH2_First")}</h2>
            <p className="demo-p">{t("demoP_First")}</p>
            <h2 className="demo-h2">{t("demoH2_Second")}</h2>
            <p className="demo-p">{t("demoP_Second")}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
