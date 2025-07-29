import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/src/assets/Frame 10.svg'
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

interface SuiQuestLoginProps {
  onSignIn: () => void;
}

const SuiQuestLogin: React.FC<SuiQuestLoginProps> = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  // Navigate to role selection when wallet is connected
  useEffect(() => {
    if (account?.address) {
      // Store wallet address in localStorage
      localStorage.setItem('walletAddress', account.address);
      navigate('/skill-selection');
    }
  }, [account, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-42 py-4">
        {/* Logo - Left */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" style={{ width: 50 }} /> 
          <span className='text-bold'>Sui Quest</span>
        </div>
        
        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href='/dashboard' className="text-gray-300 hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Search
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Leaderboard
          </a>
        </nav>

        <ConnectButton className='bg-[#4099ff]'/>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">You are one step away</h1>
            <p className="text-gray-400 text-lg">from joining Sui Quest</p>
          </div>

          <div className="space-y-4">
            {/* Primary Connect Wallet Button */}
            { !account?.address && (
              <ConnectButton
                className="w-full bg-[#4099ff] hover:bg-[#4099ff] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Connect with wallet</span>
              </ConnectButton>
            )}
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
