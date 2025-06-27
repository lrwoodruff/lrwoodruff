import React from 'react';
import Head from 'next/head';
import SimpleNursingRolePlayMobile from '../components/SimpleNursingRolePlayMobile';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Nursing Role-Play Practice</title>
        <meta name="description" content="Practice nursing communication skills with interactive role-play scenarios" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <SimpleNursingRolePlayMobile />
      </main>
    </>
  );
};

export default Home;