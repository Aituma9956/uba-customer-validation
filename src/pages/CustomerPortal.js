import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button, Card, Input, Select } from '../components/SharedComponents';
import { REQUEST_TYPES, ID_TYPES, UBA_RED, UBA_GRAY } from '../utils/constants';
import { Shield, Camera, Upload, CheckCircle, FileText, User } from 'lucide-react';

const CustomerPortal = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    identificationType: 'bvn',
    identificationNumber: '',
    accountNumber: '',
    otp: '',
    requestType: '',
    idType: '',
    idNumber: '',
    documents: [],
    faceCaptured: false,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, documents: [...formData.documents, ...files] });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Simulate submission
    alert('Validation request submitted successfully! Your request ID is REQ-2026-' + Math.floor(Math.random() * 1000));
    navigate('/track-request');
  };

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: 'Identity Verification', icon: User },
      { num: 2, label: 'Request Type', icon: FileText },
      { num: 3, label: 'Document Upload', icon: Upload },
      { num: 4, label: 'Biometric Capture', icon: Camera },
      { num: 5, label: 'Review & Submit', icon: CheckCircle },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', padding: '0 20px' }}>
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          return (
            <div key={s.num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#4caf50' : isActive ? UBA_RED : '#e0e0e0',
                  color: isCompleted || isActive ? '#fff' : '#999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  transition: 'all 0.3s',
                }}
              >
                <Icon size={24} />
              </div>
              <div style={{ fontSize: '12px', textAlign: 'center', color: isActive ? UBA_RED : '#666' }}>
                {s.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: `calc(${(index + 1) * 20}% + 25px)`,
                    width: `calc(20% - 50px)`,
                    height: '2px',
                    backgroundColor: isCompleted ? '#4caf50' : '#e0e0e0',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <Card title="Identity Verification">
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Select Identification Type
        </label>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              value="bvn"
              checked={formData.identificationType === 'bvn'}
              onChange={(e) => handleInputChange('identificationType', e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Bank Verification Number (BVN)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              value="account"
              checked={formData.identificationType === 'account'}
              onChange={(e) => handleInputChange('identificationType', e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Account Number
          </label>
        </div>
      </div>

      {formData.identificationType === 'bvn' ? (
        <Input
          label="Enter your BVN"
          type="text"
          value={formData.identificationNumber}
          onChange={(e) => handleInputChange('identificationNumber', e.target.value)}
          placeholder="Enter 11-digit BVN"
          required
        />
      ) : (
        <Input
          label="Enter your Account Number"
          type="text"
          value={formData.accountNumber}
          onChange={(e) => handleInputChange('accountNumber', e.target.value)}
          placeholder="Enter 10-digit account number"
          required
        />
      )}

      <div style={{ backgroundColor: UBA_GRAY, padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <Shield size={24} color={UBA_RED} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Secure Verification</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              We'll send a One-Time Password (OTP) to your registered phone number to verify your identity.
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleNextStep} fullWidth>
        Send OTP
      </Button>
    </Card>
  );

  const renderStep2 = () => (
    <Card title="OTP Verification & Request Type">
      <Input
        label="Enter OTP"
        type="text"
        value={formData.otp}
        onChange={(e) => handleInputChange('otp', e.target.value)}
        placeholder="Enter 6-digit OTP"
        required
      />
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        OTP sent to ****7890. Didn't receive it?{' '}
        <span style={{ color: UBA_RED, cursor: 'pointer', fontWeight: '600' }}>Resend OTP</span>
      </div>

      <Select
        label="Select Validation Request Type"
        value={formData.requestType}
        onChange={(e) => handleInputChange('requestType', e.target.value)}
        options={REQUEST_TYPES}
        required
      />

      <Select
        label="Select ID Type"
        value={formData.idType}
        onChange={(e) => handleInputChange('idType', e.target.value)}
        options={ID_TYPES}
        required
      />

      <Input
        label="Enter ID Number"
        type="text"
        value={formData.idNumber}
        onChange={(e) => handleInputChange('idNumber', e.target.value)}
        placeholder="Enter your ID number"
        required
      />

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="secondary" onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button onClick={handleNextStep} fullWidth>
          Continue
        </Button>
      </div>
    </Card>
  );

  const renderStep3 = () => {
    const selectedRequest = REQUEST_TYPES.find((r) => r.id === formData.requestType);
    const requiredDocs = selectedRequest?.documents || [];

    return (
      <Card title="Upload Required Documents">
        <div style={{ backgroundColor: UBA_GRAY, padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '600', marginBottom: '12px' }}>Required Documents:</div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {requiredDocs.map((doc) => (
              <li key={doc} style={{ marginBottom: '8px' }}>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            border: `2px dashed ${UBA_RED}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <Upload size={48} color={UBA_RED} style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Click to upload documents
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Supported formats: PDF, JPG, PNG (Max 5MB each)
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>

        {formData.documents.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Uploaded Documents:</div>
            {formData.documents.map((doc, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '6px',
                  marginBottom: '8px',
                }}
              >
                <FileText size={20} color={UBA_RED} />
                <span style={{ flex: 1 }}>{doc.name}</span>
                <CheckCircle size={20} color="#4caf50" />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
          <Button onClick={handleNextStep} fullWidth disabled={formData.documents.length === 0}>
            Continue
          </Button>
        </div>
      </Card>
    );
  };

  const renderStep4 = () => (
    <Card title="Biometric Verification">
      <div style={{ backgroundColor: UBA_GRAY, padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <Camera size={24} color={UBA_RED} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Live Face Capture</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              We'll capture your live photo to verify your identity against government records. Please ensure:
            </div>
            <ul style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              <li>Your face is clearly visible</li>
              <li>Good lighting</li>
              <li>Remove glasses/masks if possible</li>
              <li>Look directly at the camera</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          border: `2px solid ${UBA_RED}`,
          borderRadius: '8px',
          padding: '60px',
          textAlign: 'center',
          marginBottom: '20px',
          backgroundColor: formData.faceCaptured ? '#e8f5e9' : UBA_GRAY,
        }}
      >
        <Camera size={80} color={formData.faceCaptured ? '#4caf50' : UBA_RED} style={{ marginBottom: '16px' }} />
        {formData.faceCaptured ? (
          <>
            <CheckCircle size={40} color="#4caf50" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#4caf50' }}>
              Face Captured Successfully!
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              Biometric Score: 98.5% Match
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
              Position your face in the frame
            </div>
            <Button onClick={() => handleInputChange('faceCaptured', true)}>
              Capture Face
            </Button>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="secondary" onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button onClick={handleNextStep} fullWidth disabled={!formData.faceCaptured}>
          Continue
        </Button>
      </div>
    </Card>
  );

  const renderStep5 = () => (
    <Card title="Review & Submit">
      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: UBA_RED }}>
          Please review your information
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>Identification Type:</div>
            <div>{formData.identificationType === 'bvn' ? 'BVN' : 'Account Number'}</div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>Identification Number:</div>
            <div>
              {formData.identificationType === 'bvn'
                ? formData.identificationNumber
                : formData.accountNumber}
            </div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>Request Type:</div>
            <div>{REQUEST_TYPES.find((r) => r.id === formData.requestType)?.name}</div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>ID Type:</div>
            <div>{ID_TYPES.find((i) => i.id === formData.idType)?.name}</div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>ID Number:</div>
            <div>{formData.idNumber}</div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>Documents Uploaded:</div>
            <div>{formData.documents.length} files</div>
          </div>

          <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
            <div style={{ fontWeight: '600', minWidth: '200px' }}>Biometric Verification:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="#4caf50" />
              Completed (98.5% match)
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#e3f2fd',
          border: '1px solid #2196f3',
          padding: '16px',
          borderRadius: '6px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#1565c0' }}>
          <strong>What happens next?</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0 }}>
            <li>Your request will be reviewed by our CFC team</li>
            <li>You'll receive SMS/email updates on your request status</li>
            <li>Typical processing time: 24-72 hours</li>
            <li>You can track your request anytime using your Request ID</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="secondary" onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button onClick={handleSubmit} fullWidth>
          Submit Request
        </Button>
      </div>
    </Card>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar userType="customer" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#333', marginBottom: '12px' }}>Customer Validation Portal</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Complete your validation request in 5 simple steps
          </p>
        </div>

        <div style={{ position: 'relative' }}>{renderStepIndicator()}</div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </div>
    </div>
  );
};

export default CustomerPortal;
