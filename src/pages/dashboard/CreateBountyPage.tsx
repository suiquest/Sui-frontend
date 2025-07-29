import React, { useState } from 'react';
import { ArrowLeft, DollarSign } from 'lucide-react';
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
    skillTags: [] as string[]
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
  const availableSkills = ['TypeScript', 'React', 'Python', 'Rust', 'Solidity', 'UI/UX', 'Writing'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bountyData = {
      ...formData,
      bountyAmount: bountyAmount,
      protocolPrice: protocolPrice,
      totalPricePool: totalPricePool,
      id: Date.now().toString(),
      company: 'Your Company',
      postedTime: 'Posted just now',
      avatar: '💰'
    };

    // Save to localStorage
    const existingJobs = localStorage.getItem('jobListings');
    const jobListings = existingJobs ? JSON.parse(existingJobs) : [];
    const updatedJobs = [bountyData, ...jobListings];
    localStorage.setItem('jobListings', JSON.stringify(updatedJobs));

    const existingMyListings = localStorage.getItem('myListings');
    const myListings = existingMyListings ? JSON.parse(existingMyListings) : [];
    const updatedMyListings = [bountyData, ...myListings];
    localStorage.setItem('myListings', JSON.stringify(updatedMyListings));
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/dashboard/manage-listing');
    }, 2000);
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillTags: prev.skillTags.includes(skill)
        ? prev.skillTags.filter(s => s !== skill)
        : [...prev.skillTags, skill]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardNavbar userProfile={userProfile} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Bounty created successfully! Price pool: ${totalPricePool.toFixed(2)}</span>
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
          <h1 className="text-2xl font-bold text-white">Create New Bounty</h1>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bounty Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter bounty title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Describe what you need..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Bounty Amount (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.bountyAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, bountyAmount: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="0.00 (Enter 0 for free bounty)"
                />
              </div>

              {/* Price Pool Breakdown */}
              <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                <h4 className="text-white font-medium mb-2">Price Pool Breakdown</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Bounty Amount:</span>
                  <span className="text-white">${bountyAmount.toFixed(2)}</span>
                </div>
                {bountyAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Protocol Fee (5%):</span>
                    <span className="text-white">${protocolPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-600 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white">Total Price Pool:</span>
                    <span className="text-blue-400">${totalPricePool.toFixed(2)}</span>
                  </div>
                </div>
                {bountyAmount === 0 && (
                  <p className="text-yellow-400 text-xs mt-2">
                    Free bounty - No protocol fee applies
                  </p>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Due Date *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      formData.skillTags.includes(skill)
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/manage-listing')}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Bounty
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBountyPage;
