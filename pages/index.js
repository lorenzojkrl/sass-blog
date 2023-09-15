import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { Navbar } from "../components/navbar";
import Hero from "../components/hero";
import Section from "../components/section";
import { sectionData } from "../components/sectionData";
import Footer from "../components/footer";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <Section
        data={sectionData.generation}
        title={t(`${sectionData.generation.title}`)}
      />
      {/* <Section data={sectionData.pricing} /> */}
      <Footer />
    </>
  );
}
