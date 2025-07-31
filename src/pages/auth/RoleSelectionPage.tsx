import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// Types
type AccountType = 'Contributor' | 'Funder' | null;

interface Skill {
id: string;
label: string;
icon: string;
}

interface ProfileFormData {
firstName: string;
lastName: string;
role: string;
bio: string;
}

// Progress Status Component
const ProgressionStatus: React.FC<{ currentStep: number }> = ({ currentStep }) => {
const steps = [
  { number: 1, label: 'Account Type' },
  { number: 2, label: 'Skills' },
  { number: 3, label: 'Profile' }
];

return (
  <div className="w-full bg-slate-800 py-4">
    <div className="max-w-6xl mx-auto px-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${currentStep >= step.number 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-700 text-gray-400'
              }
            `}>
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className={`ml-2 text-sm ${
              currentStep >= step.number ? 'text-white' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-4 h-px w-12 ${
                currentStep > step.number ? 'bg-blue-500' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

// Bottom Actions Component  
const BottomActions: React.FC<{
onBack?: () => void;
onSkip?: () => void;
onNext?: () => void;
backLabel?: string;
nextLabel?: string;
showSkip?: boolean;
showBack?: boolean;
}> = ({ 
onBack, 
onSkip, 
onNext, 
backLabel = "Back", 
nextLabel = "Next",
showSkip = true,
showBack = true 
}) => (
<div className="flex justify-between items-center mt-12">
  <div className="flex gap-4">
    {showBack && onBack && (
      <button
        onClick={onBack}
        className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
      >
        {backLabel}
      </button>
    )}
    {showSkip && onSkip && (
      <button
        onClick={onSkip}
        className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
      >
        Skip for now
      </button>
    )}
  </div>
  {onNext && (
    <button
      onClick={onNext}
      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {nextLabel}
    </button>
  )}
</div>
);

const UnifiedOnboardingPage: React.FC = () => {
const [currentStep, setCurrentStep] = useState(1);
const [isAnimating, setIsAnimating] = useState(false);

// Step 1: Role Selection
const [selectedAccount, setSelectedAccount] = useState<AccountType>(null);

// Step 2: Skills
const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
const [searchQuery, setSearchQuery] = useState('');

// Step 3: Profile
const [formData, setFormData] = useState<ProfileFormData>({
  firstName: '',
  lastName: '',
  role: 'Unknown',
  bio: ''
});
const [profileImage, setProfileImage] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);

const skills: Skill[] = [
  { id: 'javascript', label: 'JavaScript', icon: 'J' },
  { id: 'python', label: 'Python', icon: 'P' },
  { id: 'java', label: 'Java', icon: 'J' },
  { id: 'typescript', label: 'TypeScript', icon: 'T' },
  { id: 'csharp', label: 'C#', icon: 'C#' },
  { id: 'cpp', label: 'C++', icon: 'C+' },
  { id: 'writer', label: 'X Writer', icon: 'X' },
  { id: 'copywriter', label: 'Copywriter', icon: 'C' },
  { id: 'ui', label: 'UI/UX Designer', icon: 'UI' },
  { id: 'animation', label: '2D Animation', icon: '2D' },
  { id: 'rive', label: 'Rive', icon: 'R' },
  { id: 'rust', label: 'Rust', icon: 'R' }
];

// Check for existing profile on mount
useEffect(() => {
  const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  if (savedProfile.name && savedProfile.role && savedProfile.walletAddress) {
    console.log('User already has complete profile:', savedProfile);
    // In a real app, this would navigate to dashboard
  }
}, []);

// Animation handler
const animateToStep = (nextStep: number) => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentStep(nextStep);
    setIsAnimating(false);
  }, 300);
};

// Step handlers
const handleNext = () => {
  if (currentStep === 1 && selectedAccount) {
    if (selectedAccount === 'Contributor') {
      animateToStep(2);
    } else {
      // For Funder, skip skills and go to profile
      animateToStep(3);
    }
  } else if (currentStep === 2) {
    animateToStep(3);
  } else if (currentStep === 3) {
    // Complete profile setup
    const userProfile = {
      name: `${formData.firstName} ${formData.lastName}`.trim() || 'User',
      role: selectedAccount === 'Contributor' ? 'Bounty Hunter' : 
            selectedAccount === 'Funder' ? 'Funder' : 
            formData.role !== 'Unknown' ? formData.role : 'User',
      profileImage: profileImage,
      bio: formData.bio || 'No bio added yet',
      skills: selectedSkills,
      walletAddress: 'temp-address' // This would come from wallet connection
    };
    
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile setup complete! In a real app, this would navigate to the dashboard.');
    console.log('Complete profile:', userProfile);
  }
};

const handleBack = () => {
  if (currentStep > 1) {
    animateToStep(currentStep - 1);
  }
};

const handleSkip = () => {
  if (currentStep === 2) {
    animateToStep(3);
  } else if (currentStep === 3) {
    alert('Skipping to dashboard! In a real app, this would navigate to the dashboard.');
    console.log('Skipped profile setup');
  }
};

// Skills functions
const toggleSkill = (skillId: string) => {
  const skill = skills.find(s => s.id === skillId);
  if (!skill) return;

  if (selectedSkills.includes(skill.label)) {
    setSelectedSkills(selectedSkills.filter(s => s !== skill.label));
  } else {
    setSelectedSkills([...selectedSkills, skill.label]);
  }
};

const removeSkill = (skillLabel: string) => {
  setSelectedSkills(selectedSkills.filter(s => s !== skillLabel));
};

// Profile functions
const handleInputChange = (field: keyof ProfileFormData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const calculateProgress = (): number => {
  const fields = Object.values(formData);
  const filledFields = fields.filter(field => field.trim() !== '' && field !== 'Unknown').length;
  return Math.round((filledFields / fields.length) * 100);
};

const filteredSkills = skills.filter(skill => 
  skill.label.toLowerCase().includes(searchQuery.toLowerCase())
);

// Render Step 1: Role Selection
const renderRoleSelection = () => (
  <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Choose Your Account Type</h1>
          <p className="text-gray-400">Select how you want to participate in our platform</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Contributor Card */}
          <div 
            className={`
              group p-8 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105
              ${selectedAccount === 'Contributor' 
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-750'
              }
            `}
            onClick={() => setSelectedAccount('Contributor')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${selectedAccount === 'Contributor' 
                  ? 'border-blue-500 bg-blue-500 scale-110' 
                  : 'border-slate-600 group-hover:border-slate-500'
                }
              `}>
                {selectedAccount === 'Contributor' && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white text-xl font-semibold mb-2">Contributor</h3>
              <p className="text-gray-400 text-sm">
                Step In. Build Proof. Get Rewarded.
              </p>
            </div>
          </div>

          {/* Funder Card */}
          <div 
            className={`
              group p-8 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105
              ${selectedAccount === 'Funder' 
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-750'
              }
            `}
            onClick={() => setSelectedAccount('Funder')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${selectedAccount === 'Funder' 
                  ? 'border-blue-500 bg-blue-500 scale-110' 
                  : 'border-slate-600 group-hover:border-slate-500'
                }
              `}>
                {selectedAccount === 'Funder' && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-white text-xl font-semibold mb-2">Funder</h3>
              <p className="text-gray-400 text-sm">
                Scale Faster with Trusted Contributors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Render Step 2: Skills Selection
const renderSkillSelection = () => (
  <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
    <div className="flex gap-12 mb-8">
      {/* Left Column */}
      <div className="flex-1 max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Choose your skills</h2>
        <p className="text-gray-400 mb-6">
          Select the skill sets you know you are good at. We support many more skill sets than shown here
        </p>
        
        {/* Info Box */}
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mb-6 animate-pulse">
          <p className="text-amber-200 text-sm">
            If you don't see your skill? Please use the search box to find more options like Video Editing, Solidity, Dart and Copywriting
          </p>
        </div>

        {/* Progress Box */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <span className="text-blue-400 text-sm font-medium">⚡ {selectedSkills.length}/8</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((selectedSkills.length / 8) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm">
            Add at least 8 skills to maximize your opportunities
          </p>
        </div>

        {/* Selected Skills */}
        {selectedSkills.length > 0 && (
          <div className="mb-6">
            <p className="text-white text-sm mb-3">Selected ({selectedSkills.length})</p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <span 
                  key={skill} 
                  className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm flex items-center animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="flex-1 max-w-2xl">
        {/* Search Box */}
        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for a skill"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Showing {filteredSkills.length} popular skill{filteredSkills.length !== 1 ? 's' : ''}
        </p>
        <h3 className="text-white text-lg font-medium mb-6">Popular Skills</h3>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className={`
                group p-4 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105
                ${selectedSkills.includes(skill.label)
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-750'
                }
              `}
              onClick={() => toggleSkill(skill.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded flex items-center justify-center text-white text-xs font-medium group-hover:from-slate-500 group-hover:to-slate-600 transition-all">
                    {skill.icon}
                  </div>
                  <span className="text-white group-hover:text-blue-400 transition-colors">{skill.label}</span>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${selectedSkills.includes(skill.label)
                    ? 'border-blue-500 bg-blue-500 scale-110'
                    : 'border-slate-600 group-hover:border-slate-500'
                  }
                `}>
                  {selectedSkills.includes(skill.label) && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredSkills.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-400">No skills found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Render Step 3: Profile Setup
const renderProfileSetup = () => (
  <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
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
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm">
            Fill in all required fields to reach 100%
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 max-w-2xl">
        <h3 className="text-white text-xl font-medium mb-8">Setup your profile</h3>
        
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div 
            className="group w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl"
            onClick={() => fileInputRef.current?.click()}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl"></div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
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
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          {/* Role Dropdown */}
          <div className="relative">
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="Unknown">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Writer">Writer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Marketing">Marketing</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
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
              rows={6}
              maxLength={400}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-sm transition-colors ${
                formData.bio.length > 350 ? 'text-red-400' : 'text-gray-400'
              }`}>
                {formData.bio.length}/400 characters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

return (
  <div className="min-h-screen bg-slate-900">
    <ProgressionStatus currentStep={currentStep} />
    
    <div className="max-w-6xl mx-auto p-8">
      {/* Dynamic content based on current step */}
      <div className="mb-8">
        {currentStep === 1 && renderRoleSelection()}
        {currentStep === 2 && renderSkillSelection()}
        {currentStep === 3 && renderProfileSetup()}
      </div>

      {/* Bottom Actions */}
      <BottomActions
        onBack={currentStep > 1 ? handleBack : undefined}
        onSkip={currentStep > 1 ? handleSkip : undefined}
        onNext={handleNext}
        backLabel={
          currentStep === 2 ? "Back to account type" :
          currentStep === 3 ? "Back to skills" : "Back"
        }
        nextLabel={
          currentStep === 1 ? "Next to Skills" :
          currentStep === 2 ? "Next to Profile" : "Complete Setup"
        }
        showSkip={currentStep > 1}
        showBack={currentStep > 1}
      />
    </div>

    <style>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `}</style>
  </div>
);
};

export default UnifiedOnboardingPage;