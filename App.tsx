import React, { useState } from 'react';
import { Stepper } from './components/ui/Stepper';
import { LoanDetails } from './components/steps/LoanDetails';
import { IdentityVerification } from './components/steps/IdentityVerification';
import { GSTVerification } from './components/steps/GSTVerification';
import { BankingDetails } from './components/steps/BankingDetails';
import { ScheduleVisit } from './components/steps/ScheduleVisit';
import { SuccessStep } from './components/steps/SuccessStep';
import { FormData, INITIAL_DATA } from './types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STEPS = ["Business", "Identity", "Verification", "Banking", "Schedule"];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateData = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Basic Validation Logic
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Loan
        return formData.loanAmount && formData.loanTenure;
      case 2: // Identity
        return formData.isAadharVerified && formData.panNumber && formData.selfieImage && formData.consentGiven;
      case 3: // GST
        return formData.gstDetails !== null;
      case 4: // Banking
        return formData.bankName && formData.bankStatement;
      case 5: // Schedule
        return formData.visitDate && formData.visitTime;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <SuccessStep onReset={() => {
                setFormData(INITIAL_DATA);
                setCurrentStep(1);
                setIsSubmitted(false);
            }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                E
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">EasyRupi</span>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Step {currentStep} of {STEPS.length}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <Stepper currentStep={currentStep} steps={STEPS} />

        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 md:p-10 min-h-[400px]">
              {currentStep === 1 && <LoanDetails data={formData} updateData={updateData} />}
              {currentStep === 2 && <IdentityVerification data={formData} updateData={updateData} />}
              {currentStep === 3 && <GSTVerification data={formData} updateData={updateData} />}
              {currentStep === 4 && <BankingDetails data={formData} updateData={updateData} />}
              {currentStep === 5 && <ScheduleVisit data={formData} updateData={updateData} />}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 md:px-10 py-4 flex justify-between items-center border-t border-gray-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all transform active:scale-95 ${
                  isStepValid()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === STEPS.length ? 'Submit Application' : 'Proceed'}
                {currentStep !== STEPS.length && <ArrowRight className="w-4 h-4 ml-2" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Helper text for demo purposes */}
        <div className="mt-4 text-center text-xs text-gray-400">
            <p>Demo Mode: OTP is 1234, GST simulates fetch after 2s.</p>
        </div>

      </main>
    </div>
  );
};

export default App;