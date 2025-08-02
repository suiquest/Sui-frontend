import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressionStatus from '../../components/common/ProgressionStatus';
import { useCurrentAccount, useSignAndExecuteTransaction, useSignPersonalMessage } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { testnet } from '../../contract/contract_testnet';

// Types
// type AccountType = 'Contributor' | 'Funder' | null;

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

// Mock Tusky class for demonstration
class Tusky {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_config: Record<string, unknown>) {
    // config is used in constructor but not stored as property
  }
  
  auth = {
    signIn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };
  
  vault = {
    listAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [] as { name: string; id: string }[];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: async (_name: string, _options: Record<string, unknown>) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { id: `vault_${Date.now()}` };
    }
  };
  
  file = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upload: async (_vaultId: string, _file: File) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return `walrus_blob_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    download: async (_fileId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Blob();
    }
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addEncrypter = async (_options: Record<string, unknown>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
  };
  
  signOut = () => {};
}

// Skill options
const skills: Skill[] = [
  { id: 'javascript', label: 'JavaScript', icon: 'JS' },
  { id: 'python', label: 'Python', icon: 'PY' },
  { id: 'java', label: 'Java', icon: 'JV' },
  { id: 'typescript', label: 'TypeScript', icon: 'TS' },
  { id: 'csharp', label: 'C#', icon: 'C#' },
  { id: 'cpp', label: 'C++', icon: 'C+' },
  { id: 'writer', label: 'X Writer', icon: 'XW' },
  { id: 'copywriter', label: 'Copywriter', icon: 'CW' },
  { id: 'ui', label: 'UI/UX Designer', icon: 'UI' },
  { id: 'animation', label: '2D Animation', icon: '2D' },
  { id: 'rive', label: 'Rive', icon: 'RV' },
  { id: 'rust', label: 'Rust', icon: 'RS' },
];

// Upload Progress Component
const UploadProgress: React.FC<{
  isUploading: boolean;
  progress: number;
  stage: string;
}> = ({ isUploading, progress, stage }) => {
  if (!isUploading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
              style={{ 
                background: `conic-gradient(from 0deg, transparent, transparent ${progress * 3.6}deg, #3b82f6 ${progress * 3.6}deg)`
              }}
            ></div>
            <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">{Math.round(progress)}%</span>
            </div>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Uploading to Vault</h3>
          <p className="text-gray-400 text-sm">{stage}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Initializing Tusky...</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Setting up encryption...</span>
            <span className={progress > 25 ? "text-green-400" : "text-gray-500"}>
              {progress > 25 ? "✓" : "⋯"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Creating vault...</span>
            <span className={progress > 50 ? "text-green-400" : "text-gray-500"}>
              {progress > 50 ? "✓" : "⋯"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Uploading image...</span>
            <span className={progress > 85 ? "text-green-400" : "text-gray-500"}>
              {progress > 85 ? "✓" : "⋯"}
            </span>
          </div>
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
  isLoading?: boolean;
}> = ({
  onBack,
  onSkip,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  showSkip = true,
  showBack = true,
  isLoading = false
}) => (
  <div className="flex justify-between items-center mt-12">
    <div className="flex gap-4">
      {showBack && onBack && (
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {backLabel}
        </button>
      )}
      {showSkip && onSkip && (
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          Skip for now
        </button>
      )}
    </div>
    {onNext && (
      <button
        onClick={onNext}
        disabled={isLoading}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
        {nextLabel}
      </button>
    )}
  </div>
);

const UnifiedOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1 (skills)
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [tusky, setTusky] = useState<Tusky | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [walrusBlobId, setWalrusBlobId] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Step 1: Role Selection
  // const [selectedAccount, setSelectedAccount] = useState<AccountType>(null); // Removed

  // Step 2: Skills (now step 1)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Step 3: Profile (now step 2)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    role: 'Contributor', // Default to Contributor since we removed role selection
    bio: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const networkVariables = testnet;

  // Scroll to bottom of logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string, methodCall?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    if (methodCall) {
      setLogs(prev => [...prev, `${timestamp}: ${message}`, `  → ${methodCall}`]);
    } else {
      setLogs(prev => [...prev, `${timestamp}: ${message}`]);
    }
  };

  // Initialize Tusky
  const initializeTusky = async (): Promise<Tusky> => {
    if (tusky) return tusky;

    if (!currentAccount) {
      throw new Error('No wallet account connected');
    }

    addLog('Initializing Tusky with wallet...', 'new Tusky({ wallet: { signPersonalMessage, account } })');
    const tuskyInstance = new Tusky({ 
      wallet: { 
        signPersonalMessage, 
        account: currentAccount 
      } 
    });

    setUploadProgress(15);
    setUploadStage('Signing in with wallet...');
    addLog('Signing in with wallet...', 'tusky.auth.signIn()');
    await tuskyInstance.auth.signIn();

    setUploadProgress(30);
    setUploadStage('Setting up encryption...');
    addLog('Setting up encryption context...');
    await handleEncryptionContext(tuskyInstance);

    setUploadProgress(45);
    addLog('Adding keystore encrypter...', 'tusky.addEncrypter({ keystore: true })');
    await tuskyInstance.addEncrypter({ keystore: true });

    setTusky(tuskyInstance);
    addLog('Successfully initialized Tusky');
    return tuskyInstance;
  };

  const handleEncryptionContext = async (tuskyInstance: Tusky) => {
    // In a real app, you might want to use a more secure method to get the password
    const password = "demo_password_123"; // For demo purposes
    addLog('Adding password encrypter...', 'tusky.addEncrypter({ password: "***", keystore: true })');
    await tuskyInstance.addEncrypter({ password: password, keystore: true });
  };

  // Upload image to Tusky vault
  const uploadImageToTusky = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Initializing...');

    try {
      const tuskyInstance = await initializeTusky();
      
      const vaultName = "SuiQuest Profile Images";
      
      setUploadProgress(60);
      setUploadStage('Checking vaults...');
      addLog('Listing vaults...', 'tusky.vault.listAll()');
      const vaults = await tuskyInstance.vault.listAll();
      
      const existingVault = vaults.find((vault: { name: string; id: string }) => vault.name === vaultName);
      let vaultId = existingVault?.id as string;
      
      if (!existingVault) {
        setUploadProgress(70);
        setUploadStage('Creating vault...');
        addLog(`Creating new vault: ${vaultName}`, `tusky.vault.create("${vaultName}", { encrypted: true })`);
        const { id } = await tuskyInstance.vault.create(vaultName, { encrypted: true });
        vaultId = id;
      }

      setUploadProgress(80);
      setUploadStage('Uploading image...');
      addLog(`Uploading file to vault: ${vaultId}`, `tusky.file.upload("${vaultId}", file)`);
      const blobId = await tuskyInstance.file.upload(vaultId, file);

      setUploadProgress(95);
      setUploadStage('Verifying upload...');
      addLog(`Image uploaded successfully`, `Walrus Blob ID: ${blobId}`);
      
      setUploadProgress(100);
      setUploadStage('Upload complete!');
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);

      return blobId;
    } catch (error) {
      setIsUploading(false);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      addLog(`Upload error: ${errorMessage}`);
      throw error;
    }
  };

  // Hash email (placeholder)
  const hashEmail = async (email: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Animation handler
  const animateToStep = (nextStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsAnimating(false);
    }, 300);
  };

  // Step handlers
  const handleNext = async () => {
    setError(null);
    
    if (currentStep === 1 && selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }
    
    if (currentStep === 2) {
      if (!formData.firstName || !formData.bio) {
        setError('First name and bio are required');
        return;
      }
      
      if (!currentAccount) {
        setError('Please connect your wallet');
        return;
      }
      
      if (!profileImage) {
        setError('Please upload a profile image');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Upload image to Tusky and get Walrus blob ID
        addLog('Starting image upload to Walrus vault...');
        const blobId = await uploadImageToTusky(profileImage);
        setWalrusBlobId(blobId);

        // Generate email hash
        const emailHash = await hashEmail(`${formData.firstName}@example.com`);
        addLog('Generated email hash', `SHA-256("${formData.firstName}@example.com")`);

        // Construct transaction for register_user
        const tx = new Transaction();
        tx.moveCall({
          package: networkVariables.PACKAGE_ID,
          module: 'questcontract',
          function: 'register_user',
          arguments: [
            tx.object(networkVariables.PLATFORM_OBJECT_ID),
            tx.pure.string(formData.firstName),
            tx.pure.vector('u8', Array.from(new TextEncoder().encode(emailHash))),
            tx.pure.string(blobId),
            tx.pure.string(formData.bio),
            tx.pure.vector('string', selectedSkills),
            tx.pure.string(formData.role),
            tx.object('0x6'),
          ],
        });

        // Sign and execute transaction
        addLog('Executing registration transaction...', 'signAndExecuteTransaction');
        await signAndExecute(
          {
            transaction: tx,
            account: currentAccount,
          },
          {
            onSuccess: (result) => {
              addLog('Registration successful!', `Transaction digest: ${result.digest}`);
              addLog(`Profile image stored with Walrus blob ID: ${blobId}`);
              
              // Create user profile object
              const userProfile = {
                name: `${formData.firstName} ${formData.lastName}`.trim() || 'User',
                role: formData.role,
                profileImage: profileImage ? URL.createObjectURL(profileImage) : '',
                bio: formData.bio || 'No bio added yet',
                skills: selectedSkills,
                walletAddress: currentAccount.address,
                walrusBlobId: blobId,
              };
              
              // Save to localStorage
              localStorage.setItem('userProfile', JSON.stringify(userProfile));
              
              setLoading(false);
              addLog('Profile setup complete! Navigating to dashboard...');
              
              // Show success message and navigate
              setTimeout(() => {
                alert('Profile setup complete! Your image is securely stored on Walrus.');
                navigate('/dashboard', { state: { userProfile } });
              }, 1000);
            },
            onError: (error) => {
              addLog(`Registration failed: ${error.message}`);
              setError(`Registration failed: ${error.message}`);
              setLoading(false);
            },
          }
        );
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        addLog(`Error: ${errorMessage}`);
        setError(`Error: ${errorMessage}`);
        setLoading(false);
      }
      return;
    }

    if (currentStep === 1) {
      animateToStep(2);
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
      addLog('Skipped profile setup');
      alert('Skipping to dashboard! In a real app, this would navigate to the dashboard.');
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
      setProfileImage(file);
      setWalrusBlobId(null); // Reset blob ID when new image is selected
      addLog(`Selected image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  };

  const calculateProgress = (): number => {
    const fields = Object.values(formData).concat(profileImage ? 'image' : '', selectedSkills.length > 0 ? 'skills' : '');
    const filledFields = fields.filter(field => field.trim() !== '' && field !== 'Unknown').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const filteredSkills = skills.filter(skill =>
    skill.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render Step 1: Role Selection
  // Removed

  // Render Step 2: Skills Selection
  const renderSkillSelection = () => (
    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
        {/* Left Column - Info Section */}
        <div className="w-full lg:flex-1 lg:max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Choose your skills</h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Select the skill sets you are proficient in.
          </p>
          
          {/* Skills Boost Info Box */}
          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 text-lg">⚡</span>
              <span className="text-amber-200 font-medium text-sm sm:text-base">Skills Boost</span>
            </div>
            <p className="text-amber-200 text-xs sm:text-sm">
              Add skills to match with relevant bounties and increase your earning potential.
            </p>
          </div>
          
          {/* Progress Box */}
          <div className="bg-slate-800 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-center mb-2">
              <span className="text-blue-400 text-xs sm:text-sm font-medium">⚡ {selectedSkills.length}/8 skills</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((selectedSkills.length / 8) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              Add at least 8 skills to maximize your opportunities
            </p>
          </div>
          
          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="mb-6">
              <p className="text-white text-xs sm:text-sm mb-3">Selected Skills ({selectedSkills.length})</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center animate-fadeIn shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 sm:ml-2 text-white/80 hover:text-red-300 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Skills Grid */}
        <div className="w-full lg:flex-1 lg:max-w-2xl">
          {/* Search Box */}
          <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for a skill"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            Showing {filteredSkills.length} popular skill{filteredSkills.length !== 1 ? 's' : ''}
          </p>
          <h3 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Popular Skills</h3>
          
          {/* Skills Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                className={`
                  group p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${selectedSkills.includes(skill.label)
                    ? 'border-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-lg shadow-blue-500/20'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-750'
                  }
                `}
                onClick={() => toggleSkill(skill.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded flex items-center justify-center text-white text-xs font-medium transition-all ${
                      selectedSkills.includes(skill.label)
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg'
                        : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-slate-500 group-hover:to-slate-600'
                    }`}>
                      {skill.icon}
                    </div>
                    <span className="text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base">{skill.label}</span>
                  </div>
                  <div className={`
                    w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${selectedSkills.includes(skill.label)
                      ? 'border-blue-500 bg-blue-500 scale-110'
                      : 'border-slate-600 group-hover:border-slate-500'
                    }
                  `}>
                    {selectedSkills.includes(skill.label) && (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredSkills.length === 0 && searchQuery && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-400 text-sm">No skills found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Step 3: Profile Setup
  const renderProfileSetup = () => (
    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <div className="flex-1 max-w-full lg:max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Complete your profile setup</h2>
          <p className="text-gray-400 mb-6 lg:mb-8 text-sm sm:text-base">
            Your profile is your on-chain resume stored securely on Walrus
          </p>
          
          {/* Progress Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 sm:p-6 mb-4 lg:mb-6 border border-slate-700">
            <div className="flex items-center mb-3">
              <span className="text-blue-400 text-xl sm:text-2xl font-bold">{calculateProgress()}%</span>
              <span className="text-gray-400 text-xs sm:text-sm ml-2">Complete</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${calculateProgress()}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              Fill in all required fields to reach 100%
            </p>
          </div>

          {/* Walrus Storage Info */}
          <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/50 rounded-lg p-3 sm:p-4 mb-6 lg:mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400 text-base sm:text-lg">🔒</span>
              <span className="text-emerald-200 font-medium text-sm sm:text-base">Secure Storage</span>
            </div>
            <p className="text-emerald-200 text-xs sm:text-sm">
              Your profile image will be securely stored on Walrus with decentralized encryption via Tusky.
            </p>
            {walrusBlobId && (
              <div className="mt-2 p-2 bg-emerald-800/30 rounded text-xs text-emerald-300 font-mono break-all">
                Blob ID: {walrusBlobId.substring(0, 20)}...
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <h3 className="text-white text-lg sm:text-xl font-medium mb-6 lg:mb-8">Setup your profile</h3>
          
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="relative">
              <div
                className="group w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 relative overflow-hidden shadow-2xl hover:shadow-purple-500/25"
                onClick={() => fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
              {profileImage && (
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
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
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                />
                {formData.firstName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                />
                {formData.lastName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="Unknown">Select Role</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Writer">Writer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Scientist">Data Scientist</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {formData.role !== 'Unknown' && (
                <div className="absolute right-8 sm:right-10 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </div>
            
            <div className="relative">
              <textarea
                placeholder="Write your story in 80 words or less"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={5}
                maxLength={400}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  {formData.bio && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  <span className="text-xs text-gray-400">Bio completed</span>
                </div>
                <span className={`text-xs sm:text-sm transition-colors ${
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
)
  return (
    <div className="min-h-screen bg-slate-900">
      <ProgressionStatus currentStep={currentStep} />
      <UploadProgress 
        isUploading={isUploading} 
        progress={uploadProgress} 
        stage={uploadStage} 
      />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}
        
        <div className="mb-8">
          {currentStep === 1 && renderSkillSelection()}
          {currentStep === 2 && renderProfileSetup()}
        </div>
        
        <BottomActions
          onBack={currentStep > 1 ? handleBack : undefined}
          onSkip={handleSkip}
          onNext={handleNext}
          backLabel="Back to skills"
          nextLabel={
            currentStep === 1 ? "Next to Profile" : 
            loading ? "Registering..." : "Complete Setup"
          }
          showSkip={true}
          showBack={currentStep > 1}
          isLoading={loading || isUploading}
        />
        
        {/* Enhanced Logs Section */}
        <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="bg-slate-700/50 px-6 py-3 border-b border-slate-600">
            <h3 className="text-white text-lg font-medium flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              System Logs
            </h3>
          </div>
          <div className="p-6 max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-400 text-sm italic">Waiting for actions...</p>
            ) : (
              logs.map((log, index) => (
                <p 
                  key={index} 
                  className={`text-sm mb-1 font-mono ${
                    log.startsWith('  →') 
                      ? 'text-blue-300 ml-4' 
                      : log.includes('Error') || log.includes('failed')
                      ? 'text-red-400'
                      : log.includes('successful') || log.includes('complete')
                      ? 'text-green-400'
                      : 'text-gray-300'
                  }`}
                >
                  {log}
                </p>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
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
