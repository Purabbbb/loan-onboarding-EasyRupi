import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center bg-transparent">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : isCurrent
                    ? 'bg-white border-indigo-600 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium hidden md:block ${
                  isCurrent ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
      {/* Mobile Label */}
      <div className="md:hidden text-center mt-4">
        <p className="text-sm font-semibold text-gray-700">
          Step {currentStep}: <span className="text-indigo-600">{steps[currentStep - 1]}</span>
        </p>
      </div>
    </div>
  );
};