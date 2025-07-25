// src/components/common/ProgressionStatus.tsx
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ProgressionStatusProps {
  currentStep: number;
  showCompletionAnimation?: boolean;
}

const ProgressionStatus: React.FC<ProgressionStatusProps> = ({ 
  currentStep, 
  showCompletionAnimation = false 
}) => {
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);

  const steps = [
    { id: 1, label: 'Account', completed: currentStep > 1, active: currentStep === 1 },
    { id: 2, label: 'Skill Set', completed: currentStep > 2, active: currentStep === 2 },
    { id: 3, label: 'Profile', completed: currentStep > 3, active: currentStep === 3 }
  ];

  useEffect(() => {
    if (showCompletionAnimation) {
      // Animate steps completing one by one
      const timer1 = setTimeout(() => {
        setAnimatedSteps([1]);
      }, 200);
      
      const timer2 = setTimeout(() => {
        setAnimatedSteps([1, 2]);
      }, 600);
      
      const timer3 = setTimeout(() => {
        setAnimatedSteps([1, 2, 3]);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [showCompletionAnimation]);

  const isStepAnimated = (stepId: number) => {
    return showCompletionAnimation ? animatedSteps.includes(stepId) : false;
  };

  const getStepStatus = (step: any) => {
    if (showCompletionAnimation) {
      // On completion page, show animation for completed steps
      const isAnimated = isStepAnimated(step.id);
      const shouldBeCompleted = step.id <= 3; // All steps should be completed
      return {
        completed: shouldBeCompleted && isAnimated,
        active: false,
        shouldShow: isAnimated
      };
    } else {
      // Normal behavior for other pages
      return {
        completed: step.completed,
        active: step.active,
        shouldShow: true
      };
    }
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center space-x-8 bg-[#273345] px-4 rounded-lg py-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-500
                  ${status.completed 
                    ? 'bg-blue-600 text-white transform scale-110' 
                    : status.active 
                      ? 'bg-white text-slate-900' 
                      : 'border text-gray-400'
                  }
                  ${showCompletionAnimation && status.completed ? 'animate-pulse' : ''}
                `}>
                  {status.completed ? (
                    <Check className={`w-4 h-4 transition-all duration-300 ${
                      showCompletionAnimation ? 'animate-bounce' : ''
                    }`} />
                  ) : (
                    <span className={`transition-opacity duration-300 ${
                      showCompletionAnimation && !status.shouldShow ? 'opacity-30' : 'opacity-100'
                    }`}>
                      {step.id}
                    </span>
                  )}
                </div>
                <span className={`
                  text-sm font-medium transition-all duration-300
                  ${status.completed ? 'text-white' : status.active ? 'text-white' : 'text-gray-400'}
                  ${showCompletionAnimation && status.completed ? 'font-semibold' : ''}
                `}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-px ml-6 transition-all duration-500
                  ${status.completed && steps[index + 1] && getStepStatus(steps[index + 1]).completed
                    ? 'bg-blue-500' 
                    : 'bg-slate-700'
                  }
                `}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressionStatus;