// src/pages/auth/RoleSelectionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressionStatus from '../../components/common/ProgressionStatus';
import BottomActions from '../../components/common/BottomActions';

type AccountType = 'bounty-hunter' | 'funder' | null;

const RoleSelectionPage: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<AccountType>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate to previous page or handle back action
    console.log('Back clicked');
  };

  const handleNext = () => {
    if (selectedAccount) {
      navigate('/skill-selection');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <ProgressionStatus currentStep={1} />
      
      {/* Main content centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Bounty Hunter Card */}
            <div 
              className={`
                pt-20 pb-5 px-2 rounded-lg border cursor-pointer transition-all
                ${selectedAccount === 'bounty-hunter' 
                  ? 'border-blue-500 bg-slate-800' 
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }
              `}
              onClick={() => setSelectedAccount('bounty-hunter')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedAccount === 'bounty-hunter' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-slate-600'
                  }
                `}>
                  {selectedAccount === 'bounty-hunter' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Bounty Hunter</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Funder Card */}
            <div 
              className={`
                pt-20 pb- px-2 rounded-lg border cursor-pointer transition-all
                ${selectedAccount === 'funder' 
                  ? 'border-blue-500 bg-slate-800' 
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }
              `}
              onClick={() => setSelectedAccount('funder')}
            >
              <div className="flex items-center justify-between">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedAccount === 'funder' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-slate-600'
                  }
                `}>
                  {selectedAccount === 'funder' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold ">Funder</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions fixed at bottom */}
      <div className="max-w-4xl w-full mx-auto px-8 pb-8">
        <BottomActions
          onNext={handleNext}
          nextLabel="Next to Profile"
          showSkip={false}
          showBack={false}
        />
      </div>
    </div>
  );
};

export default RoleSelectionPage;