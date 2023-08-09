import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { Navbar } from "../components/navbar";
import Hero from "../components/hero";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import { benefitOne } from "../components/benefitDescription";
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
      {/* <SectionTitle pretitle={t("sectionPreTitle")} title={t("sectionTitle")}>
        {t("designedTo")}
        <br />
        <br />
        {t("writeTopicAndKeywords")}
      </SectionTitle> */}
      <Benefits data={benefitOne} />
      <Footer />
    </>
  );
}
