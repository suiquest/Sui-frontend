// src/pages/auth/ProfileSetupPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressionStatus from '../../components/common/ProgressionStatus';
import BottomActions from '../../components/common/BottomActions';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
}

const ProfileSetupPage: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    role: 'Unknown',
    bio: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProgress = (): number => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '' && field !== 'Unknown').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleBack = () => {
    navigate('/skill-selection');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleNext = () => {
    // Handle profile completion
    console.log('Profile data:', formData);
    // Pass the user's first name to the completion page
    const firstName = formData.firstName.trim() || 'User';
    navigate('/profile-completion', { state: { firstName } });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <ProgressionStatus currentStep={3} />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-12">
          {/* Left Column */}
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Complete your profile setup</h2>
            <p className="text-gray-400 mb-8">
              Your profile is your on-chain resume
            </p>
            
            {/* Progress Box */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="text-blue-400 text-2xl font-bold">{calculateProgress()}%</span>
              </div>
              <p className="text-gray-300 text-sm">
                Fill in all required to fields to reach 100%
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 max-w-2xl">
            <h3 className="text-white text-xl font-medium mb-8">Setup your profile</h3>
            
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              {/* Role Dropdown */}
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  <option value="Unknown">Unknown</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Writer">Writer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Bio Textarea */}
              <div>
                <textarea
                  placeholder="Write your story in 80 words or less"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={8}
                  maxLength={400}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <span className="text-sm text-gray-400">
                    {formData.bio.length}/400 characters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomActions
          onBack={handleBack}
          onSkip={handleSkip}
          onNext={handleNext}
          backLabel="Back to skill set"
          nextLabel="Next to Profile"
        />
      </div>
    </div>
  );
};

export default ProfileSetupPage;