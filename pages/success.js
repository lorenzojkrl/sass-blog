import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import Link from "next/link";

export default function Success() {
  return (
    <div className="h-full overflow-hidden flex justify-center">
      <div className="flex h-full w-full max-w-sm flex-col justify-center items-center">
        <h1>All Good! You Are Ready To Create More Content</h1>
        <Link href="/post/new" className="btn">
          New Post
        </Link>
      </div>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
