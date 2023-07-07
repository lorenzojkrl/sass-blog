import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";

export default function TokenTopup() {
  const handleClick = async () => {
    await fetch(`/api/addTokens`, {
      method: 'POST'
    })
  }

  return <div>Hola Token
    <h1>Token Topup</h1>
    <button
      className="bg-green-500 trackinf-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block"
      onClick={handleClick}
    >Add tokens</button>

  </div>;
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})