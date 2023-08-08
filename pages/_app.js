import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { PostsProvider } from "../context/postsContext";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { LanguageSetter } from "../components/shared/languageSetter";
// Fix fontawesome huge icon on startup
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
// End of fix

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>AI SEO Writer</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <UserProvider>
          <PostsProvider>
            <LanguageSetter />
            <main
              className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}
            >
              {getLayout(<Component {...pageProps} />, pageProps)}
            </main>
          </PostsProvider>
        </UserProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
