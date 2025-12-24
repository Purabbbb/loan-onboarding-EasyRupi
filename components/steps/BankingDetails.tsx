import React from 'react';
import { FormData } from '../../types';
import { UploadCloud, FileText } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
}

const BANKS = ["ICICI Bank", "HDFC Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda", "State Bank of India", "Kotak Mahindra Bank"];

export const BankingDetails: React.FC<Props> = ({ data, updateData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ bankStatement: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Banking Information</h2>
        <p className="text-gray-500">Link your primary business account.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Business Bank <span className="text-red-500">*</span>
        </label>
        <select
          className="block w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border shadow-sm"
          value={data.bankName}
          onChange={(e) => updateData({ bankName: e.target.value })}
        >
          <option value="" disabled>Select your bank</option>
          {BANKS.map((bank) => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload 12 months Bank Statement
        </label>
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer group">
           <label htmlFor="statement-upload" className="cursor-pointer w-full h-full block">
              <div className="flex flex-col items-center">
                {data.bankStatement ? (
                    <div className="bg-indigo-100 p-4 rounded-full mb-3 text-indigo-600">
                        <FileText className="h-8 w-8" />
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-full mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                        <UploadCloud className="h-8 w-8 text-indigo-600" />
                    </div>
                )}
                
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {data.bankStatement ? data.bankStatement.name : 'Click to upload or drag and drop'}
                </h3>
                <p className="text-xs text-gray-500">
                    PDF, Excel (Max 10MB). Dec '24 - Dec '25
                </p>
                
                {!data.bankStatement && (
                    <div className="mt-4 flex gap-3 justify-center">
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium">Netbanking</span>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium">Attach File</span>
                    </div>
                )}
              </div>
              <input 
                id="statement-upload" 
                type="file" 
                accept=".pdf,.xls,.xlsx,.csv" 
                className="sr-only" 
                onChange={handleFileChange}
              />
           </label>
        </div>
      </div>
    </div>
  );
};