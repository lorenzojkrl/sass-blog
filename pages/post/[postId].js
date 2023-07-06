import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Post() {
  return <div>Hola Post</div>;
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})


