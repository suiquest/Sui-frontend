import React, { useState } from 'react';
import { ArrowLeft, Clock, Upload, Link, Calendar, Users, Award, Target } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import DashboardNavbar from '../../components/common/DashboardNavbar';

// Submit Bounty Modal Component
const SubmitBountyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [submissionData, setSubmissionData] = useState({
    title: '',
    description: '',
    url: '',
    file: null as File | null
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting bounty:', submissionData);
    onClose();
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-start justify-end z-50">
      <div className="bg-white rounded-lg max-w-md w-full m-4 mt-10 mr-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Submit Your Work</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-2">We can't wait to see what you've created!</p>
            <p className="text-xs">Note: You can edit this submission until the bounty deadline.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submission Title *
            </label>
            <input
              type="text"
              required
              value={submissionData.title}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter submission title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={submissionData.description}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your submission..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL (optional)
            </label>
            <input
              type="url"
              value={submissionData.url}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-700"
              >
                Click to upload or drag and drop
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
              {submissionData.file && (
                <p className="text-sm text-green-600 mt-2">{submissionData.file.name}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BountyDetailPage = () => {
  const location = useLocation();
  const bounty = location.state?.bounty;
  const [selectedPrize, setSelectedPrize] = useState('First');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Dynamic prizes based on bounty amount
  const totalBounty = bounty?.bounty || bounty?.totalAmount || 1000;
  const prizes = [
    { name: 'First', amount: `$${Math.floor(totalBounty * 0.5)}`, color: 'bg-blue-500' },
    { name: 'Second', amount: `$${Math.floor(totalBounty * 0.3)}`, color: 'bg-gray-400' },
    { name: 'Third', amount: `$${Math.floor(totalBounty * 0.2)}`, color: 'bg-orange-400' }
  ];

  // Dynamic submissions from localStorage or default
  const getSubmissions = () => {
    const savedSubmissions = localStorage.getItem(`bounty_${bounty?.id}_submissions`);
    if (savedSubmissions) {
      return JSON.parse(savedSubmissions);
    }
    return []; // Empty array if no submissions
  };

  const [submissions, setSubmissions] = useState(getSubmissions());

  // Dynamic skill tags from bounty data
  const skillTags = bounty?.skillTags || bounty?.skills || ['TypeScript', 'Python', 'Contributing', 'Rust'];

  // Calculate remaining time
  const calculateRemainingTime = () => {
    if (!bounty?.dueDate) return '13h 45m 30s';
    
    const now = new Date();
    const deadline = new Date(bounty.dueDate);
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  const remainingTime = calculateRemainingTime();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Left */}
          <div className="lg:col-span-1 space-y-6">
            {/* Prizes Section */}
            <div>
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                Prizes
              </h3>
              <div className="space-y-1">
                {prizes.map((prize) => (
                  <div
                    key={prize.name}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPrize === prize.name 
                        ? ' border-slate-600' 
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedPrize(prize.name)}
                  >
                    <div className={`w-2 h-2 rounded-full ${prize.color}`}></div>
                    <span className="text-white font-medium flex-1">{prize.name}</span>
                    <span className="text-white font-bold">{prize.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Bounty Button */}
            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" />
              Submit Bounty
            </button>

            {/* Remaining Time */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-white font-medium">Remaining</span>
              </div>
              <div className="text-2xl font-bold text-white">{remainingTime}</div>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Skill Set
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-white font-medium">Deadline</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                {bounty?.dueDate ? new Date(bounty.dueDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'August 01, 2023'} - as scheduled by the
              </p>
              <p className="text-white font-medium">{bounty?.company || 'Creator'}</p>
            </div>

            {/* Submission Count */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4" />
                <span className="text-gray-400 text-sm">{submissions.length} Submissions</span>
              </div>
              {submissions.length > 0 && (
                <>
                  <div className="flex items-center gap-1 mb-2">
                    {submissions.slice(0, 5).map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    ))}
                    {submissions.length > 5 && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs">
                        +{submissions.length - 5}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">
                    {submissions.slice(0, 3).map(s => s.submitter).join(', ')}
                    {submissions.length > 3 && ` & ${submissions.length - 3} others`}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Main Content - Right */}
          <div className="lg:col-span-3">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 bg-green-400 rounded transform rotate-45"></div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-3">
                  {bounty?.title || 'Bounty Title'}
                </h1>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{bounty?.postedTime || 'Posted time'}</span>
                  <span>•</span>
                  <span>{bounty?.category || 'Category'}</span>
                  <span>•</span>
                  <span>${bounty?.bounty || bounty?.totalAmount || '0'}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {bounty?.description || 'Bounty description'}
                </p>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <p className="text-blue-400 mb-4">
                <strong>{bounty?.company || 'Company'}</strong> {bounty?.companyDescription || 'is building innovative solutions.'}
              </p>
              {bounty?.links && (
                <p className="text-blue-400 mb-2 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Documentation <a href={bounty.links} className="underline hover:text-blue-300">Docs</a>
                </p>
              )}
              <div className="mt-4">
                <button className="text-gray-400 text-sm hover:text-gray-300 flex items-center gap-1">
                  Show more ↓
                </button>
              </div>
            </div>

            {/* Submissions Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-semibold text-white">Submissions</h2>
              </div>
              <p className="text-gray-400 text-sm mb-6">Total bounty: ${totalBounty}</p>

              {submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="bg-slate-800 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-blue-400 text-sm">{submission.platform}</span>
                          </div>
                          <h3 className="text-white font-medium mb-2">
                            {submission.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{submission.platform}</span>
                            <span className="text-green-400">{submission.votes}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{submission.timeAgo}</span>
                          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                          <span>{submission.submitter}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No submissions yet. Be the first to submit!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Bounty Modal */}
      <SubmitBountyModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};

export default BountyDetailPage;
