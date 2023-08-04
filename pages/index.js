import Head from "next/head";
import { Navbar } from "../components/navbar";
import Hero from "../components/hero";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import { benefitOne } from "../components/benefitDescription";
import Footer from "../components/footer";
import { useRouter } from "next/router";

const landingPageContent = {
  en: {
    title: "AI SEO Writer - AI-generated Copy",
    metaDescription:
      "AI SEO Writer gets content writers to their first copy faster",
    home: "Home",
    sectionPreTitle: "Benefits",
    sectionTitle: "Why you should use AI SEO Writer",
    designedTo:
      "AI SEO Writer is being designed to help you get to your first copy faster.",
    writeTopicAndKeywords: `Write the topic and the keywords you want to use. Get an SEO draft,
    including meta title, meta description and your keywords. Now focus on
    the work that matters.`,
  },
  it: {
    title: "AI SEO Writer - Crea bozze con l'intelligenza artificiale",
    metaDescription:
      "AI SEO Writer aiuta i professionisti del marketing ad ottenere la loro prima bozza più velocemente",
    sectionPreTitle: "Vantaggi",
    sectionTitle: "I vantaggi di usare AI SEO Writer",
    designedTo:
      "Stiamo costruendo AI SEO Writer per aiutarti a ottenere la tua prima bozza più velocemente.",
    writeTopicAndKeywords: `Scrivi l'argomento e le keyword che desideri utilizzare. Ottieni una bozza SEO, con meta titolo, meta descrizione e le tue keyword. Ora concentrandoti sul lavoro che conta.`,
  },
  es: {
    title: "AI SEO Writer - Copia generada por IA",
    metaDescription:
      "AI SEO Writer permite a los redactores de contenidos obtener su primera copia más rápido",
    sectionPreTitle: "Ventajas",
    sectionTitle: "Los beneficios de usar AI SEO Writer.",
    designedTo:
      "Estamos construyendo AI SEO Writer para ayudarte a obtener tu primer borrador más rápido.",
    writeTopicAndKeywords: `Escribe el tema y las palabras clave que deseas utilizar. Obtén un borrador SEO, que incluye el título meta, descripción meta y tus palabras clave. Ahora concéntrate en el trabajo que importa.`,
  },
};

export default function Home() {
  const { locale } = useRouter();
  const {
    title,
    metaDescription,
    sectionPreTitle,
    sectionTitle,
    designedTo,
    writeTopicAndKeywords,
  } = landingPageContent[locale];
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle pretitle={sectionPreTitle} title={sectionTitle}>
        {designedTo}
        <br />
        <br />
        {writeTopicAndKeywords}
      </SectionTitle>
      <Benefits data={benefitOne} />
      {/*<Benefits imgPos="right" data={benefitTwo} /> */}
      {/*
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq />
      <Cta />*/}
      <Footer />
      {/* <PopupWidget /> */}
    </>
  );
}
