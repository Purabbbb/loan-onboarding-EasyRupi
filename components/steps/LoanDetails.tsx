import React from 'react';
import { FormData } from '../../types';
import { Building2, User } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
}

export const LoanDetails: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
        <p className="text-gray-500">Tell us about your business needs.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Business Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateData({ businessType: 'LLP' })}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
              data.businessType === 'LLP'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
            }`}
          >
            <Building2 className="mb-2 h-6 w-6" />
            <span className="font-medium">LLP Company</span>
          </button>
          
          <button
            type="button"
            onClick={() => updateData({ businessType: 'Proprietorship' })}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
              data.businessType === 'Proprietorship'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
            }`}
          >
            <User className="mb-2 h-6 w-6" />
            <span className="font-medium">Proprietorship</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Requested Loan Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              className="block w-full rounded-lg border-gray-300 bg-white text-gray-900 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 py-3 border shadow-sm placeholder:text-gray-400"
              placeholder="0.00"
              value={data.loanAmount}
              onChange={(e) => updateData({ loanAmount: e.target.value })}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">INR</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-1">
            Requested Loan Tenure <span className="text-red-500">*</span> <span className="text-gray-400 text-xs">(in months)</span>
          </label>
          <input
            type="number"
            id="tenure"
            className="block w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border shadow-sm placeholder:text-gray-400"
            placeholder="e.g. 12"
            value={data.loanTenure}
            onChange={(e) => updateData({ loanTenure: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};