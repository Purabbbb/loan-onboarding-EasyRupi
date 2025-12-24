import React, { useState } from 'react';
import { FormData } from '../../types';
import { Search, Building, MapPin, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
}

export const GSTVerification: React.FC<Props> = ({ data, updateData }) => {
  const [fetching, setFetching] = useState(false);

  const handleFetchGST = () => {
    if (data.gstNumber.length < 5) return; // Simple validation
    setFetching(true);
    
    // Simulate API Call
    setTimeout(() => {
      setFetching(false);
      updateData({
        gstDetails: {
          companyName: "Acme Traders Pvt Ltd",
          address: "123, Tech Park, Indiranagar, Bangalore - 560038",
          phone: "+91 98765 43210",
          email: "contact@acmetraders.com",
          registeredAs: data.businessType,
          registrationDate: "12-Aug-2020"
        }
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Business Verification</h2>
        <p className="text-gray-500">Verify your business using GST.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Enter GST Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="block w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border shadow-sm uppercase placeholder:text-gray-400"
            placeholder="22AAAAA0000A1Z5"
            value={data.gstNumber}
            onChange={(e) => updateData({ gstNumber: e.target.value.toUpperCase() })}
          />
          <button
            type="button"
            onClick={handleFetchGST}
            disabled={fetching || !data.gstNumber}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap shadow-sm transition-all"
          >
            {fetching ? 'Fetching...' : 'Fetch Details'}
          </button>
        </div>
      </div>

      {data.gstDetails && (
        <div className="bg-white rounded-xl border-2 border-indigo-100 overflow-hidden shadow-sm animate-in zoom-in-95 duration-300">
          <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
            <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Verified Details
            </h3>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Building className="h-3 w-3" /> Company Name</p>
                  <p className="font-medium text-gray-900">{data.gstDetails.companyName}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Registration Date</p>
                  <p className="font-medium text-gray-900">{data.gstDetails.registrationDate}</p>
               </div>
            </div>
            
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</p>
              <p className="font-medium text-gray-900">{data.gstDetails.address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-3">
               <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</p>
                  <p className="font-medium text-gray-900">{data.gstDetails.phone}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Mail className="h-3 w-3" /> Email</p>
                  <p className="font-medium text-gray-900">{data.gstDetails.email}</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};