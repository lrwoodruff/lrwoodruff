import React from 'react';
import Head from 'next/head';
import SimpleNursingRolePlayMobile from '../components/SimpleNursingRolePlayMobile_backup';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nursing Role-Play Practice</title>
        <meta name="description" content="Practice nursing communication skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <SimpleNursingRolePlayMobile />
      </main>
    </>
  );
}
