// import Image from "next/image";
// import HeroImage from "../public/hero.webp";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import Hero from "../components/hero";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import { benefitOne } from "../components/benefitDescription";
import Footer from "../components/footer";
export default function Home() {
  return (
    <>
      <Head>
        <title>AI SEO Writer - AI-generated draft</title>
        <meta
          name="description"
          content="AI SEO Writer helps content writers to get to the first draft faster"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle
        pretitle="Benefits"
        title=" Why you should use AI SEO Writer"
      >
        AI SEO Writer is being designed to help you get to your first draft
        faster.
        <br />
        <br />
        Write the topic and the keywords you want to use. Get an SEO draft,
        including meta title, meta description and your keywords. Now focus on
        the work that matters.
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

// 2. Review menu in header
// 3. Review menu & Legal in footer
