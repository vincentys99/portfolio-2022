import Head from "next/head";

import SimCompanies_Index from "../components/simcompanies";

export default function SimCompanies() {
  return (
    <>
      <Head>
        <title>Sim Companies</title>
      </Head>
      <SimCompanies_Index />
    </>
  );
}
