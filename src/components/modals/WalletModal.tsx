import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalEarned: string;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, totalEarned }) => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleWithdraw = () => {
    console.log('Withdrawing:', { amount, walletAddress });
    // Handle withdrawal logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-end z-50">
      <div className="bg-white rounded-lg max-w-sm w-full m-4 mt-20 mr-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bilal's Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Message */}
          <div className="text-sm text-gray-600">
            <p className="mb-2">We can't wait to see what you've created!</p>
            <p className="text-xs">Note: You can edit this submission until the bounty deadline.</p>
          </div>

          {/* Total Amount */}
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${totalEarned}
            </div>
            <div className="text-sm text-gray-500">Total Bounty Winnings</div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Wallet Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send to
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter wallet address"
            />
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={!amount || !walletAddress}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Withdraw
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;

