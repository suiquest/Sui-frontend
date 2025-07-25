// src/pages/auth/SkillSelectionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressionStatus from '../../components/common/ProgressionStatus';
import BottomActions from '../../components/common/BottomActions';

interface Skill {
  id: string;
  label: string;
  icon: string;
}

const SkillSelectionPage: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
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

  const handleBack = () => {
    navigate('/role-selection');
  };

  const handleSkip = () => {
    navigate('/profile-setup');
  };

  const handleNext = () => {
    navigate('/profile-setup');
  };

  const filteredSkills = skills.filter(skill => 
    skill.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <ProgressionStatus currentStep={2} />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-12 mb-8">
          {/* Left Column */}
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Choose your skill</h2>
            <p className="text-gray-400 mb-6">
              Select the skill set you know you are good at. We support many more skill sets than shown here
            </p>
            
            {/* Info Box */}
            <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mb-6">
              <p className="text-amber-200 text-sm">
                If you don't see your skill? Please use the search box to find more options like Video Editing, Solidity, Dart and Copywriting
              </p>
            </div>

            {/* Progress Box */}
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <span className="text-blue-400 text-sm font-medium">⚡ {selectedSkills.length}/8</span>
              </div>
              <p className="text-gray-300 text-sm">
                Add at least 8 skills to maximize your opportunities
              </p>
            </div>

            {/* Selected Skills - Only show if there are selected skills */}
            {selectedSkills.length > 0 && (
              <div className="mb-6">
                <p className="text-white text-sm mb-3">selected ({selectedSkills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <span key={skill} className="bg-slate-700 text-white px-3 py-1 rounded text-sm flex items-center">
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-gray-400 hover:text-white"
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
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Showing {filteredSkills.length} popular skill{filteredSkills.length !== 1 ? 's' : ''}
            </p>
            <h3 className="text-white text-lg font-medium mb-6">Popular Skill</h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all
                    ${selectedSkills.includes(skill.label)
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    }
                  `}
                  onClick={() => toggleSkill(skill.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-white text-xs font-medium">
                        {skill.icon}
                      </div>
                      <span className="text-white">{skill.label}</span>
                    </div>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${selectedSkills.includes(skill.label)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-600'
                      }
                    `}>
                      {selectedSkills.includes(skill.label) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
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

        <BottomActions
          onBack={handleBack}
          onSkip={handleSkip}
          onNext={handleNext}
          backLabel="Back to account type"
          nextLabel="Next to Profile"
        />
      </div>
    </div>
  );
};

export default SkillSelectionPage;