import type { NextPage } from "next";
import Head from "next/head";
import CreateToken from "../components/CreateToken";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create</title>
        <meta content="Create" name="Create" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <CreateToken />
    </>
  );
};

export default Create;
