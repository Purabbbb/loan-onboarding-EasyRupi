export type BusinessType = 'LLP' | 'Proprietorship';

export interface FormData {
  // Step 1: Loan
  businessType: BusinessType;
  loanAmount: string;
  loanTenure: string;

  // Step 2: Identity
  aadharNumber: string;
  isAadharVerified: boolean;
  panNumber: string;
  selfieImage: File | null;
  consentGiven: boolean;

  // Step 3: GST
  gstNumber: string;
  gstDetails: GstDetails | null;

  // Step 4: Banking
  bankName: string;
  bankStatement: File | null;

  // Step 5: Schedule
  visitDate: string;
  visitTime: string;
}

export interface GstDetails {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  registeredAs: string;
  registrationDate: string;
}

export const INITIAL_DATA: FormData = {
  businessType: 'LLP',
  loanAmount: '',
  loanTenure: '',
  aadharNumber: '',
  isAadharVerified: false,
  panNumber: '',
  selfieImage: null,
  consentGiven: false,
  gstNumber: '',
  gstDetails: null,
  bankName: '',
  bankStatement: null,
  visitDate: '',
  visitTime: '',
};