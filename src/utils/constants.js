// UBA Brand Colors and Constants
export const UBA_RED = '#d9140b';
export const UBA_WHITE = '#ffffff';
export const UBA_GRAY = '#f5f5f5';
export const UBA_DARK = '#333333';
export const UBA_LIGHT_GRAY = '#e0e0e0';

// Request Types
export const REQUEST_TYPES = [
  { id: 'account_reactivation', name: 'Account Reactivation', documents: ['ID', 'Utility Bill'] },
  { id: 'address_update', name: 'Address Update', documents: ['ID', 'Utility Bill', 'Proof of Address'] },
  { id: 'mandate_update', name: 'Mandate Update', documents: ['ID', 'Signature Card'] },
  { id: 'kyc_update', name: 'KYC Update', documents: ['ID', 'Utility Bill', 'BVN'] },
  { id: 'account_upgrade', name: 'Account Upgrade', documents: ['ID', 'Income Proof'] },
];

// ID Types
export const ID_TYPES = [
  { id: 'nin', name: 'National Identity Number (NIN)' },
  { id: 'passport', name: 'International Passport' },
  { id: 'drivers_license', name: "Driver's License" },
  { id: 'voters_card', name: "Voter's Card" },
];

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ESCALATED: 'escalated',
};

// SLA Times (in hours)
export const SLA_TIMES = {
  account_reactivation: 24,
  address_update: 48,
  mandate_update: 24,
  kyc_update: 72,
  account_upgrade: 48,
};
