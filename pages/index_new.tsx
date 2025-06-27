import { FC } from 'react';
import Head from 'next/head';

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Nursing Role-Play Practice</title>
        <meta name="description" content="Practice nursing communication skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold text-blue-800 mb-2">
              Nursing Role-Play Practice
            </h1>
            <p className="text-sm text-blue-600">
              Testing the application - direct implementation
            </p>
          </div>
          
          <div className="text-center">
            <p>✅ Application is running successfully!</p>
            <p className="text-sm text-gray-600 mt-2">
              Ready to add the nursing component back.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
