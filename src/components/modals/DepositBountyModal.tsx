import React, { useState } from 'react';
import { CheckCircle, Copy } from 'lucide-react';

interface DepositBountyModalProps {
  isOpen: boolean;
  onClose: () => void;
  bountyData: {
    title: string;
    description: string;
    bountyAmount: number;
    protocolFee: number;
    totalAmount: number;
    category: string;
    dueDate: string;
    organizationName?: string;
    organizationLogo?: string;
  };
  onDeposit: () => void;
}

const DepositBountyModal: React.FC<DepositBountyModalProps> = ({ 
  isOpen, 
  onClose, 
  bountyData, 
  onDeposit 
}) => {
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositComplete, setDepositComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get wallet address from localStorage
  const getWalletAddress = () => {
    const savedProfile = localStorage.getItem('userProfile');
    const walletAddress = localStorage.getItem('walletAddress');
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return profile.walletAddress || walletAddress;
    }
    return walletAddress || 'No wallet connected';
  };

  const walletAddress = getWalletAddress();

  const formatWalletAddress = (address: string): string => {
    if (!address || address === 'No wallet connected') return address;
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyAddress = async () => {
    if (walletAddress && walletAddress !== 'No wallet connected') {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const handleDeposit = async () => {
    setIsDepositing(true);
    
    // Simulate deposit process
    setTimeout(() => {
      setIsDepositing(false);
      setDepositComplete(true);
      
      // Auto close after showing success
      setTimeout(() => {
        onDeposit();
        onClose();
        setDepositComplete(false);
      }, 2000);
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header with Project Icon and Title */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4 mb-4">
            {/* Dynamic Organization Icon */}
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              {bountyData.organizationLogo ? (
                <img 
                  src={bountyData.organizationLogo} 
                  alt={bountyData.organizationName || 'Organization'} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-white font-semibold text-lg">
                  {bountyData.organizationName ? 
                    bountyData.organizationName.charAt(0).toUpperCase() : 
                    bountyData.title.charAt(0).toUpperCase()
                  }
                </div>
              )}
            </div>
            
            {/* Dynamic Title and Description */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                {bountyData.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {bountyData.description}
              </p>
            </div>
          </div>

          {/* Status Tags */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-orange-500">⚡</span>
              <span className="text-gray-700 font-medium">Bounty</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <span className="text-gray-500">Starting {formatDate(bountyData.dueDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-500">On-going</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-600 text-xs">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="px-6 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>
          
          {/* Dynamic Wallet Address */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">Wallet</span>
              <span className="text-sm font-mono text-gray-900">
                {formatWalletAddress(walletAddress)}
              </span>
              {walletAddress && walletAddress !== 'No wallet connected' && (
                <button 
                  onClick={handleCopyAddress}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy wallet address"
                >
                  <Copy className="w-3 h-3" />
                </button>
              )}
              {copied && (
                <span className="text-green-600 text-xs">Copied!</span>
              )}
            </div>
          </div>

          {/* Escrow Notice */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              The total required deposit will be held in escrow and you will be able to authorise 
              payment to all winners after the deadline is due.
            </p>
          </div>

          {/* Deposit Amount and Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚡</span>
              <span className="text-gray-600">Required Deposit</span>
              <span className="text-xl font-bold text-gray-900">${bountyData.totalAmount}</span>
            </div>
          </div>

          {/* Deposit Button */}
          <div>
            {!depositComplete ? (
              <button
                onClick={handleDeposit}
                disabled={isDepositing}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                {isDepositing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Deposit...
                  </div>
                ) : (
                  'Deposit Bounty'
                )}
              </button>
            ) : (
              <div className="bg-green-500 text-white p-4 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Deposit successful! Bounty is now live.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBountyModal;
