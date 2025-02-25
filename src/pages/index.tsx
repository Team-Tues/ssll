import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ListTokens from "../components/ListTokens";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Launchpad</title>
        <meta content="Launchpad" name="Launchpad" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <div className="text-4xl">HomePage</div>
        <Link href="/create">
          <button className="bg-blue-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-xl">
            Create Token
          </button>
        </Link>
        <ListTokens />
      </main>
    </div>
  );
};

export default Home;
