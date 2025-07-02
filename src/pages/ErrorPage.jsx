import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10 bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-10 max-w-6xl w-full">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-7xl md:text-8xl font-extrabold text-indigo-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for might have been removed, renamed, or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Go Home
            </button>
            <button
              onClick={handleGoBack}
              className="px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 font-semibold transition"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i.postimg.cc/Jh50tpnZ/8030430-3828537.jpg"
            alt="Error Illustration"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
