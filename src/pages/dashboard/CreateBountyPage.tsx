import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/common/DashboardNavbar';

const CreateBountyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    bountyAmount: '',
    dueDate: '',
    skillTags: [] as string[],
    organizationName: '',
    organizationLogo: null as string | null
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Get user profile from localStorage
  const getUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return { name: 'User', role: 'User' };
  };

  const userProfile = getUserProfile();

  // Calculate protocol price (5% of bounty amount)
  const bountyAmount = parseFloat(formData.bountyAmount) || 0;
  const protocolPrice = bountyAmount > 0 ? bountyAmount * 0.05 : 0;
  const totalPricePool = bountyAmount + protocolPrice;

  const categories = ['Development', 'Design', 'Content', 'Marketing', 'Other'];
  const availableSkills = ['Python', 'TypeScript', 'React', 'Rust', 'Solidity', 'UI/UX', 'Writing', 'Copywriting', 'Rive'];
  const rewardTiers = [
    { label: '1st', amount: '' },
    { label: '2nd', amount: '' },
    { label: '3rd', amount: '' },
    { label: '4th', amount: '' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bountyData = {
      ...formData,
      bountyAmount: bountyAmount,
      protocolPrice: protocolPrice,
      totalPricePool: totalPricePool,
      id: Date.now().toString(),
      company: formData.organizationName || 'Your Company',
      postedTime: 'Posted just now',
      avatar: '💰',
      status: 'active' as const,
      bounty: totalPricePool
    };

    // Save to localStorage for job listings
    const existingJobs = localStorage.getItem('jobListings');
    const jobListings = existingJobs ? JSON.parse(existingJobs) : [];
    const updatedJobs = [bountyData, ...jobListings];
    localStorage.setItem('jobListings', JSON.stringify(updatedJobs));

    // Save to user's listings
    const existingMyListings = localStorage.getItem('myListings');
    const myListings = existingMyListings ? JSON.parse(existingMyListings) : [];
    const updatedMyListings = [bountyData, ...myListings];
    localStorage.setItem('myListings', JSON.stringify(updatedMyListings));
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/dashboard/manage-listing');
    }, 3000);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Development',
      bountyAmount: '',
      dueDate: '',
      skillTags: [],
      organizationName: '',
      organizationLogo: null
    });
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillTags: prev.skillTags.includes(skill)
        ? prev.skillTags.filter(s => s !== skill)
        : [...prev.skillTags, skill]
    }));
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillTags: prev.skillTags.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          organizationLogo: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <DashboardNavbar userProfile={userProfile} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Bounty created successfully! Total pool: ${totalPricePool.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard/manage-listing')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-white">Create a bounty</h1>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl space-y-8">
          {/* Organization Logo */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Organisation Logo</h3>
            <p className="text-sm text-gray-400 mb-4">Upload should be less than 1MB</p>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="block w-40 h-40 bg-slate-800 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors"
              >
                {formData.organizationLogo ? (
                  <img
                    src={formData.organizationLogo}
                    alt="Organization logo"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Bounty Info */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Bounty info</h3>
            <p className="text-sm text-gray-400 mb-4">Fill in organisation info</p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Organisation name"
                value={formData.organizationName}
                onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              
              <input
                type="text"
                placeholder="Bounty Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Reward */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Reward</h3>
            <p className="text-sm text-gray-400 mb-4">
              Setup bounty rewards 
              <span className="text-blue-400 ml-2 cursor-pointer hover:underline">Add more rewards ⊕</span>
            </p>
            
            <div className="grid grid-cols-4 gap-3">
              {['1st', '2nd', '3rd', '4th'].map((position) => (
                <div key={position} className="space-y-2">
                  <div className="bg-slate-700 px-3 py-2 rounded-lg text-center text-sm text-gray-300 font-medium">
                    {position}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Skill</h3>
            <p className="text-sm text-gray-400 mb-4">
              Add the required skills for the bounty
            </p>
            
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 min-h-[120px]">
              <div className="flex flex-wrap gap-2">
                {formData.skillTags.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-blue-200 hover:text-white ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {availableSkills.filter(skill => !formData.skillTags.includes(skill)).map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm hover:bg-slate-600 transition-colors border border-slate-600"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline and Category */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Timeline</h3>
              <p className="text-sm text-gray-400 mb-4">Set Launch and Deadline Dates</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Launch</label>
                  <input
                    type="text"
                    placeholder="dd/mm/yy"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                  <input
                    type="text"
                    placeholder="dd/mm/yy"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">Category</h3>
              <p className="text-sm text-gray-400 mb-4">Set Launch and Deadline Dates</p>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tag a Day</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Summary</h3>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-gray-400">Describe the bounty</p>
              <span className="text-xs text-gray-500">800 - 1000 words</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Your description should also include your specific requirements and expectations, submission format or rules.
            </p>
            
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Start writing..."
              rows={10}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              Create Bounty
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBountyPage;
