import React, { useState } from 'react';
import { FormData } from '../../types';
import { Camera, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
}

export const IdentityVerification: React.FC<Props> = ({ data, updateData }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSendOtp = () => {
    if (data.aadharNumber.length < 12) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      updateData({ isAadharVerified: true });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ selfieImage: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
        <p className="text-gray-500">We need to verify your identity to proceed.</p>
      </div>

      {/* Aadhar Section */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Aadhar Details <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={12}
              className="flex-1 rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border shadow-sm disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400"
              placeholder="12-digit Aadhar Number"
              value={data.aadharNumber}
              disabled={data.isAadharVerified}
              onChange={(e) => updateData({ aadharNumber: e.target.value.replace(/\D/g, '') })}
            />
            {!data.isAadharVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={data.aadharNumber.length !== 12 || loading || otpSent}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex justify-center items-center"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : otpSent ? 'OTP Sent' : 'Generate OTP'}
              </button>
            )}
            {data.isAadharVerified && (
               <div className="flex items-center text-green-600 font-medium px-4">
                 <CheckCircle2 className="h-5 w-5 mr-1" /> Verified
               </div>
            )}
          </div>
        </div>

        {otpSent && !data.isAadharVerified && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                className="flex-1 rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border shadow-sm tracking-widest text-center text-lg placeholder:text-gray-400"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.length < 4 || verifying}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 min-w-[100px] flex justify-center items-center"
              >
                 {verifying ? <Loader2 className="animate-spin h-4 w-4" /> : 'Verify'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selfie Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Click a Selfie <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors bg-white">
          <div className="space-y-1 text-center">
            {data.selfieImage ? (
              <div className="relative">
                <img 
                  src={URL.createObjectURL(data.selfieImage)} 
                  alt="Selfie preview" 
                  className="mx-auto h-32 w-32 object-cover rounded-full ring-4 ring-indigo-100"
                />
                <button 
                  onClick={() => updateData({ selfieImage: null })}
                  className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <p className="mt-2 text-sm text-green-600 font-medium">Selfie Captured</p>
              </div>
            ) : (
              <>
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="selfie-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a photo</span>
                    <input id="selfie-upload" name="selfie-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">JPEG, PNG up to 5MB</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PAN Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter PAN Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="block w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border shadow-sm uppercase placeholder:normal-case placeholder:text-gray-400"
          placeholder="e.g. ABCDE1234F"
          maxLength={10}
          value={data.panNumber}
          onChange={(e) => updateData({ panNumber: e.target.value.toUpperCase() })}
        />
      </div>

      {/* Consent */}
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={data.consentGiven}
            onChange={(e) => updateData({ consentGiven: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="consent" className="font-medium text-gray-700">Authorization</label>
          <p className="text-gray-500">I authorize EasyRupi to access my credit report to consider me for a business loan.</p>
        </div>
      </div>
    </div>
  );
};