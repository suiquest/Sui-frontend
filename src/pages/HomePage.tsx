// sui-quest\src\pages\HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout 
      navbarProps={{
        authButtonText: "Get Started"
      }}
    >
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-blue-400">Sui Quest</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Embark on exciting quests, compete with others, and climb the leaderboard
            in the ultimate blockchain adventure.
          </p>
          
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Start Your Journey
            </Link>
            <button className="inline-block bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;