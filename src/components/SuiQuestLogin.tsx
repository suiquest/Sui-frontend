import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SuiQuestLoginProps {}

const SuiQuestLogin: React.FC<SuiQuestLoginProps> = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Navigate to role selection after "authentication"
    navigate('/role-selection');
  };

  const handleEmailSignIn = () => {
    // Navigate to role selection after "authentication"
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-42 py-4">
        {/* Logo - Left */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-semibold">Sui Quest</span>
        </div>
        
        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Search
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Leaderboard
          </a>
        </nav>

        {/* How it works button - Right */}
        <button className="bg-[#4099ff] hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          How it works
        </button>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">You're one step away</h1>
            <p className="text-gray-400 text-lg">from joining Sui Quest</p>
          </div>

          <div className="space-y-4">
            {/* Primary Google Sign-in Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-[#4099ff] hover:bg-[#4099ff] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">OR</span>
              </div>
            </div>

            {/* Secondary Email Sign-in Button */}
            <button
              onClick={handleEmailSignIn}
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              By using this website, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms of Use
              </a>{' '}
              and our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
              .
            </p>
            <p className="mt-2">
              Need help? Reach out to us at{' '}
              <a
                href="mailto:support@suiquest.com"
                className="text-blue-400 hover:text-blue-300"
              >
                support@suiquest.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuiQuestLogin;