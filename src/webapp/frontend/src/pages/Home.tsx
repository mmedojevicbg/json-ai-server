import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow">
        <div className="text-center px-4 py-8">
          <div className="flex justify-center">
            <img src="/logo.svg" style={{ width: "200px" }} />
          </div>
          <div className="py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              JSON AI Server
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-Driven REST Endpoint Generator
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
